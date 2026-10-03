param()

$ErrorActionPreference = "Stop"

$ProjectRoot = Split-Path -Parent $PSScriptRoot
$Utf8NoBom = New-Object System.Text.UTF8Encoding($false)

function Convert-ToEnumName {
    param([string]$Id)

    $local = ($Id -split ":", 2)[-1]
    $parts = [regex]::Split($local, "[^A-Za-z0-9]+")
    $name = ""

    foreach ($part in $parts) {
        if ([string]::IsNullOrWhiteSpace($part)) {
            continue
        }

        if ($part.Length -eq 1) {
            $name += $part.ToUpperInvariant()
        }
        else {
            $name += $part.Substring(0, 1).ToUpperInvariant()
            $name += $part.Substring(1)
        }
    }

    if ([string]::IsNullOrWhiteSpace($name)) {
        $name = "Value"
    }

    if ($name -match "^[0-9]") {
        $name = "Id" + $name
    }

    return $name
}

function Convert-ToCamelFunctionName {
    param([string]$Id)

    $pascal = Convert-ToEnumName $Id

    if ($pascal.Length -le 1) {
        return $pascal.ToLowerInvariant()
    }

    return $pascal.Substring(0, 1).ToLowerInvariant() + $pascal.Substring(1)
}

function Get-KoreanRegistryPrefix {
    param([string]$Kind)

    # Keep this source ASCII-only for Windows PowerShell 5.1.
    if ($Kind -eq "item") {
        return (
            [string]([char]0xC544) +
            [string]([char]0xC774) +
            [string]([char]0xD15C) +
            " "
        )
    }

    if ($Kind -eq "block") {
        return (
            [string]([char]0xBE14) +
            [string]([char]0xB85D) +
            " "
        )
    }

    if ($Kind -eq "entity") {
        return (
            [string]([char]0xC5D4) +
            [string]([char]0xD2F0) +
            [string]([char]0xD2F0) +
            " "
        )
    }

    throw "Unknown Registry localization kind: $Kind"
}

function Read-RegistryIds {
    param([string]$RelativePath)

    $path = Join-Path $ProjectRoot $RelativePath

    if (-not (Test-Path $path)) {
        throw "Registry source not found: $path"
    }

    $data = Get-Content $path -Raw -Encoding UTF8 | ConvertFrom-Json
    return @($data.entries | ForEach-Object { [string]$_.id })
}

function Read-CaseSensitiveJsonObject {
    param([string]$Path)

    $raw = Get-Content $Path -Raw -Encoding UTF8

    # PowerShell 7+ can preserve keys that differ only by case with -AsHashtable.
    if ($PSVersionTable.PSVersion.Major -ge 6) {
        return ($raw | ConvertFrom-Json -AsHashtable)
    }

    # Windows PowerShell 5.1 PSCustomObject property names are case-insensitive.
    # JavaScriptSerializer returns a Dictionary<string, object>, preserving
    # distinct keys such as tallGrass and tallgrass.
    Add-Type -AssemblyName System.Web.Extensions
    $serializer = New-Object System.Web.Script.Serialization.JavaScriptSerializer
    $serializer.MaxJsonLength = [int]::MaxValue
    return $serializer.DeserializeObject($raw)
}

function Remove-GeneratedRegistryLabels {
    param(
        [System.Collections.IDictionary]$Localization,
        [string]$Namespace,
        [string]$Prefix
    )

    $keyPrefix = $Namespace + "."
    $valuePrefix = $Prefix + "minecraft:"

    foreach ($key in @($Localization.Keys)) {
        $keyText = [string]$key
        $valueText = [string]$Localization[$key]

        if (
            $keyText.StartsWith($keyPrefix, [System.StringComparison]::Ordinal) -and
            $keyText.EndsWith("|block", [System.StringComparison]::Ordinal) -and
            $valueText.StartsWith($valuePrefix, [System.StringComparison]::Ordinal)
        ) {
            $Localization.Remove($key)
        }
    }
}

function Add-RegistryLabels {
    param(
        [System.Collections.IDictionary]$Localization,
        [object[]]$Ids,
        [string]$Namespace,
        [string]$Kind
    )

    $prefix = Get-KoreanRegistryPrefix $Kind

    foreach ($idValue in $Ids) {
        $id = [string]$idValue
        $fn = Convert-ToCamelFunctionName $id
        $key = $Namespace + "." + $fn + "|block"
        $Localization[$key] = $prefix + $id
    }
}

$locPath = Join-Path $ProjectRoot "_locales/ko/block_command_maker-strings.json"

if (-not (Test-Path $locPath)) {
    throw "Localization file not found: $locPath"
}

$loc = Read-CaseSensitiveJsonObject $locPath

if (-not ($loc -is [System.Collections.IDictionary])) {
    throw "Localization root must be a JSON object: $locPath"
}

$items = Read-RegistryIds "registry/source/bedrock/items.json"
$blocks = Read-RegistryIds "registry/source/bedrock/blocks.json"
$entities = Read-RegistryIds "registry/source/bedrock/entities.json"

$itemPrefix = Get-KoreanRegistryPrefix "item"
$blockPrefix = Get-KoreanRegistryPrefix "block"
$entityPrefix = Get-KoreanRegistryPrefix "entity"

# Remove only previously generated Registry labels. Manual UI translations in
# the same namespaces (select/custom/components/etc.) are left untouched.
Remove-GeneratedRegistryLabels $loc "MCFunctionItemLibrary" $itemPrefix
Remove-GeneratedRegistryLabels $loc "MCFunctionBlockLibrary" $blockPrefix
Remove-GeneratedRegistryLabels $loc "MCFunctionEntityLibrary" $entityPrefix

Add-RegistryLabels $loc $items "MCFunctionItemLibrary" "item"
Add-RegistryLabels $loc $blocks "MCFunctionBlockLibrary" "block"
Add-RegistryLabels $loc $entities "MCFunctionEntityLibrary" "entity"

$json = $loc | ConvertTo-Json -Depth 30
[System.IO.File]::WriteAllText(
    $locPath,
    $json.TrimEnd() + "`n",
    $Utf8NoBom
)

Write-Host ""
Write-Host "Korean Registry localization synchronized."
Write-Host "Items    : $($items.Count)"
Write-Host "Blocks   : $($blocks.Count)"
Write-Host "Entities : $($entities.Count)"
Write-Host ""
