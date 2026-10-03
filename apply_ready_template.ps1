param(
    [string]$ProjectRoot = "."
)

$ErrorActionPreference = "Stop"

$ProjectRoot = (Resolve-Path $ProjectRoot).Path
$PxtPath = Join-Path $ProjectRoot "pxt.json"
$MainBlocksPath = Join-Path $ProjectRoot "main.blocks"
$MainTsPath = Join-Path $ProjectRoot "main.ts"
$RuntimePath = Join-Path $ProjectRoot "src/project/runtime_ready.ts"
$KoLocalePath = Join-Path $ProjectRoot "_locales/ko/block_command_maker-strings.json"
$PatchRoot = Split-Path -Parent $MyInvocation.MyCommand.Path

if (-not (Test-Path $PxtPath)) {
    throw "pxt.json not found: $PxtPath"
}
$stamp = Get-Date -Format "yyyyMMdd-HHmmss"
$backupRoot = Join-Path $ProjectRoot ".mcblock/backups/ready-template-$stamp"
New-Item -ItemType Directory -Force -Path $backupRoot | Out-Null

function Backup-IfExists {
    param([string]$Path)

    if (-not (Test-Path $Path)) {
        return
    }

    $relative = $Path.Substring($ProjectRoot.Length).TrimStart([char[]]@([char]0x5C, [char]0x2F))
    $dest = Join-Path $backupRoot $relative
    $destDir = Split-Path -Parent $dest
    New-Item -ItemType Directory -Force -Path $destDir | Out-Null
    Copy-Item -Force $Path $dest
}

Backup-IfExists $PxtPath
Backup-IfExists $MainBlocksPath
Backup-IfExists $MainTsPath
Backup-IfExists $RuntimePath
Backup-IfExists $KoLocalePath

# ---------------------------------------------------------------------------
# 1. Runtime block source
#    Self-contained: do not depend on where this patch script was extracted.
# ---------------------------------------------------------------------------
New-Item -ItemType Directory -Force -Path (Split-Path -Parent $RuntimePath) | Out-Null

$runtimeText = @'
/**
 * Development/runtime readiness marker.
 *
 * The workspace template inserts this block into the MakeCode "on start"
 * block so the user has a visible readiness marker without adding it by hand.
 *
 * The editor block label is localized through _locales/ko.
 * The in-game message is intentionally bilingual because MakeCode extension
 * editor localization is not exposed as a reliable runtime locale value.
 */
namespace MCFunctionRuntime {

    //% blockId=mcfunction_runtime_ready
    //% block="show MCFunction test ready"
    //% blockHidden=true
    export function ready(): void {
        player.say("MCFunction READY / \uD14C\uC2A4\uD2B8 \uC900\uBE44\uC644\uB8CC");
    }
}
'@

[System.IO.File]::WriteAllText($RuntimePath, $runtimeText + [Environment]::NewLine, (New-Object System.Text.UTF8Encoding($false)))
Write-Host "[ready-template] WROTE src/project/runtime_ready.ts"

# ---------------------------------------------------------------------------
# 2. pxt.json: include runtime source exactly once
# ---------------------------------------------------------------------------
$pxt = Get-Content $PxtPath -Raw -Encoding UTF8 | ConvertFrom-Json
if ($null -eq $pxt.files) {
    throw "pxt.json has no files array."
}

$runtimeRel = "src/project/runtime_ready.ts"
$files = @($pxt.files | ForEach-Object { [string]$_ })
if ($files -notcontains $runtimeRel) {
    $inserted = $false
    $newFiles = New-Object System.Collections.Generic.List[string]

    foreach ($file in $files) {
        $newFiles.Add($file)
        if (-not $inserted -and $file -eq "main.ts") {
            $newFiles.Add($runtimeRel)
            $inserted = $true
        }
    }

    if (-not $inserted) {
        $newFiles.Add($runtimeRel)
    }

    $pxt.files = @($newFiles)
}

$pxtJson = $pxt | ConvertTo-Json -Depth 30
[System.IO.File]::WriteAllText($PxtPath, $pxtJson + [Environment]::NewLine, (New-Object System.Text.UTF8Encoding($false)))
Write-Host "[ready-template] CHECK pxt.json runtime source: PASS"

# ---------------------------------------------------------------------------
# 3. main.ts: keep TS representation consistent with main.blocks.
#    Remove only old standalone readiness helper calls, never user logic.
# ---------------------------------------------------------------------------
if (Test-Path $MainTsPath) {
    $mainTs = Get-Content $MainTsPath -Raw -Encoding UTF8
    $mainTs = [regex]::Replace(
        $mainTs,
        '(?m)^\s*MCFunctionRuntime\.(?:showReady|ready)\(\)\s*;?\s*\r?\n?',
        ''
    )
    $mainTs = "MCFunctionRuntime.ready()`r`n`r`n" + $mainTs.TrimStart()
    [System.IO.File]::WriteAllText($MainTsPath, $mainTs, (New-Object System.Text.UTF8Encoding($false)))
    Write-Host "[ready-template] UPDATED main.ts top-level ready call"
}

# ---------------------------------------------------------------------------
# 4. main.blocks: insert ready block as FIRST statement of on-start.
#    Existing on-start content is preserved and chained after the ready block.
# ---------------------------------------------------------------------------
$xmlNs = "https://developers.google.com/blockly/xml"

if (Test-Path $MainBlocksPath) {
    [xml]$xml = Get-Content $MainBlocksPath -Raw -Encoding UTF8
} else {
    $xml = New-Object System.Xml.XmlDocument
    $root = $xml.CreateElement("xml", $xmlNs)
    $xml.AppendChild($root) | Out-Null
    $variables = $xml.CreateElement("variables", $xmlNs)
    $root.AppendChild($variables) | Out-Null
}

$rootNode = $xml.DocumentElement
if ($null -eq $rootNode) {
    throw "main.blocks XML has no root element."
}
if ([string]::IsNullOrWhiteSpace($rootNode.NamespaceURI)) {
    $xmlNs = ""
} else {
    $xmlNs = $rootNode.NamespaceURI
}

$mgr = New-Object System.Xml.XmlNamespaceManager($xml.NameTable)
if ($xmlNs -ne "") {
    $mgr.AddNamespace("b", $xmlNs)
    $onStart = $xml.SelectSingleNode("//b:block[@type='pxt-on-start']", $mgr)
    $readyExisting = $xml.SelectSingleNode("//b:block[@type='mcfunction_runtime_ready']", $mgr)
} else {
    $onStart = $xml.SelectSingleNode("//block[@type='pxt-on-start']")
    $readyExisting = $xml.SelectSingleNode("//block[@type='mcfunction_runtime_ready']")
}

function New-XmlElement {
    param(
        [System.Xml.XmlDocument]$Document,
        [string]$Name,
        [string]$NamespaceUri
    )

    if ($NamespaceUri -eq "") {
        return $Document.CreateElement($Name)
    }
    return $Document.CreateElement($Name, $NamespaceUri)
}

if ($null -eq $onStart) {
    $onStart = New-XmlElement $xml "block" $xmlNs
    $onStart.SetAttribute("type", "pxt-on-start")
    $onStart.SetAttribute("id", "mcfunction_ready_on_start")
    $onStart.SetAttribute("x", "0")
    $onStart.SetAttribute("y", "0")
    $rootNode.AppendChild($onStart) | Out-Null
}

if ($null -eq $readyExisting) {
    if ($xmlNs -ne "") {
        $statement = $onStart.SelectSingleNode("b:statement[@name='HANDLER']", $mgr)
    } else {
        $statement = $onStart.SelectSingleNode("statement[@name='HANDLER']")
    }

    if ($null -eq $statement) {
        $statement = New-XmlElement $xml "statement" $xmlNs
        $statement.SetAttribute("name", "HANDLER")
        $onStart.AppendChild($statement) | Out-Null
    }

    if ($xmlNs -ne "") {
        $existingFirst = $statement.SelectSingleNode("b:block[1]", $mgr)
    } else {
        $existingFirst = $statement.SelectSingleNode("block[1]")
    }

    $readyBlock = New-XmlElement $xml "block" $xmlNs
    $readyBlock.SetAttribute("type", "mcfunction_runtime_ready")
    $readyBlock.SetAttribute("id", "mcfunction_runtime_ready_default")

    if ($null -ne $existingFirst) {
        $statement.RemoveChild($existingFirst) | Out-Null
        $next = New-XmlElement $xml "next" $xmlNs
        $next.AppendChild($existingFirst) | Out-Null
        $readyBlock.AppendChild($next) | Out-Null
    }

    $statement.AppendChild($readyBlock) | Out-Null
}

$settings = New-Object System.Xml.XmlWriterSettings
$settings.Indent = $false
$settings.OmitXmlDeclaration = $true
$settings.Encoding = New-Object System.Text.UTF8Encoding($false)
$writer = [System.Xml.XmlWriter]::Create($MainBlocksPath, $settings)
$xml.Save($writer)
$writer.Close()
Write-Host "[ready-template] CHECK main.blocks on-start ready block: PASS"

# ---------------------------------------------------------------------------
# 5. Korean block-label localization.
#    Do NOT deserialize the full localization object with ConvertFrom-Json on
#    Windows PowerShell 5.1; the project contains case-sensitive registry keys.
# ---------------------------------------------------------------------------
$koReady = (
    "MCFunction " +
    [string]([char]0xD14C) + [string]([char]0xC2A4) + [string]([char]0xD2B8) + " " +
    [string]([char]0xC900) + [string]([char]0xBE44) +
    [string]([char]0xC644) + [string]([char]0xB8CC) + " " +
    [string]([char]0xD45C) + [string]([char]0xC2DC)
)

New-Item -ItemType Directory -Force -Path (Split-Path -Parent $KoLocalePath) | Out-Null
if (Test-Path $KoLocalePath) {
    $koRaw = Get-Content $KoLocalePath -Raw -Encoding UTF8
} else {
    $koRaw = "{}"
}

$key = "MCFunctionRuntime.ready|block"
Add-Type -AssemblyName System.Web.Extensions
$serializer = New-Object System.Web.Script.Serialization.JavaScriptSerializer
$jsonValue = $serializer.Serialize($koReady)
$keyEscaped = [regex]::Escape($key)
$propertyPattern = '("' + $keyEscaped + '"\s*:\s*)"(?:\\.|[^"\\])*"'

if ([regex]::IsMatch($koRaw, $propertyPattern)) {
    $koRaw = [regex]::Replace(
        $koRaw,
        $propertyPattern,
        ('$1' + $jsonValue),
        1
    )
} else {
    $trimmed = $koRaw.TrimEnd()
    if (-not $trimmed.EndsWith("}")) {
        throw "Korean localization file is not a JSON object: $KoLocalePath"
    }

    $body = $trimmed.Substring(0, $trimmed.Length - 1).TrimEnd()
    $needsComma = -not $body.TrimEnd().EndsWith("{")
    if ($needsComma) {
        $body += ","
    }
    $koRaw = $body + [Environment]::NewLine + "  `"$key`": $jsonValue" + [Environment]::NewLine + "}" + [Environment]::NewLine
}

# Validate with JavaScriptSerializer, which preserves case-sensitive keys.
$null = $serializer.DeserializeObject($koRaw)
[System.IO.File]::WriteAllText($KoLocalePath, $koRaw, (New-Object System.Text.UTF8Encoding($false)))
Write-Host "[ready-template] CHECK Korean localization: PASS"

# Ensure locale file is included in pxt.json when it exists outside the old baseline.
$pxt = Get-Content $PxtPath -Raw -Encoding UTF8 | ConvertFrom-Json
$koRel = "_locales/ko/block_command_maker-strings.json"
$files = @($pxt.files | ForEach-Object { [string]$_ })
if ($files -notcontains $koRel) {
    $pxt.files = @($files + $koRel)
    $pxtJson = $pxt | ConvertTo-Json -Depth 30
    [System.IO.File]::WriteAllText($PxtPath, $pxtJson + [Environment]::NewLine, (New-Object System.Text.UTF8Encoding($false)))
}

# ---------------------------------------------------------------------------
# 6. Final validation
# ---------------------------------------------------------------------------
$pxtCheck = Get-Content $PxtPath -Raw -Encoding UTF8 | ConvertFrom-Json
if (@($pxtCheck.files) -notcontains $runtimeRel) {
    throw "Validation failed: runtime_ready.ts missing from pxt.json"
}
if (@($pxtCheck.files) -notcontains $koRel) {
    throw "Validation failed: Korean localization missing from pxt.json"
}

$runtimeCheck = Get-Content $RuntimePath -Raw -Encoding UTF8
if ($runtimeCheck -notmatch 'blockId=mcfunction_runtime_ready') {
    throw "Validation failed: runtime block ID missing"
}

[xml]$blocksCheck = Get-Content $MainBlocksPath -Raw -Encoding UTF8
$blocksText = Get-Content $MainBlocksPath -Raw -Encoding UTF8
if ($blocksText -notmatch 'type="mcfunction_runtime_ready"') {
    throw "Validation failed: ready block not present in main.blocks"
}

if (Test-Path $MainTsPath) {
    $mainTsCheck = Get-Content $MainTsPath -Raw -Encoding UTF8
    $count = ([regex]::Matches($mainTsCheck, 'MCFunctionRuntime\.ready\(\)')).Count
    if ($count -ne 1) {
        throw "Validation failed: expected exactly one MCFunctionRuntime.ready() in main.ts, found $count"
    }
}

Write-Host ""
Write-Host "[ready-template] Migration checks: PASS"
Write-Host "[ready-template] Backup: $backupRoot"
Write-Host "[ready-template] Expected workspace: on start -> localized MCFunction ready block"
Write-Host "[ready-template] Runtime message: MCFunction READY / (Korean: test ready)"
