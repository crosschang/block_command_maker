param(
    [switch]$DryRun,
    [switch]$SkipGenerate
)

$ErrorActionPreference = "Stop"

$ProjectRoot = Split-Path -Parent $PSScriptRoot
$Utf8NoBom = New-Object System.Text.UTF8Encoding($false)

$ItemSourceUrl = "https://raw.githubusercontent.com/MicrosoftDocs/minecraft-creator/refs/heads/main/creator/Commands/enums/Item.md"
$BlockSourceUrl = "https://raw.githubusercontent.com/MicrosoftDocs/minecraft-creator/refs/heads/main/creator/Commands/enums/Block.md"
$EntitySourceUrl = "https://raw.githubusercontent.com/MicrosoftDocs/minecraft-creator/refs/heads/main/creator/Reference/Content/VanillaListingsReference/Entities.md"

function Get-OfficialText {
    param(
        [string]$Url
    )

    Write-Host "GET $Url"

    $headers = @{
        "User-Agent" = "crosschang-block-command-maker-registry-updater"
        "Accept" = "text/plain"
    }

    $response = Invoke-WebRequest `
        -Uri $Url `
        -Headers $headers `
        -UseBasicParsing

    if ([string]::IsNullOrWhiteSpace($response.Content)) {
        throw "Downloaded official source is empty: $Url"
    }

    return [string]$response.Content
}

function Add-Unique {
    param(
        [System.Collections.Generic.List[string]]$List,
        [hashtable]$Seen,
        [string]$Value
    )

    if (-not $Seen.ContainsKey($Value)) {
        $Seen[$Value] = $true
        $List.Add($Value)
    }
}

function Get-NamespacedCommandEnumIds {
    param(
        [string]$Markdown
    )

    $result = New-Object System.Collections.Generic.List[string]
    $seen = @{}

    # Canonical vanilla IDs only.
    # Unqualified aliases and editor:* values are deliberately excluded.
    $matches = [regex]::Matches(
        $Markdown,
        '`(?<id>minecraft:[a-z0-9_]+)`'
    )

    foreach ($match in $matches) {
        Add-Unique $result $seen $match.Groups["id"].Value
    }

    return @($result)
}

function Get-OfficialEntityIds {
    param(
        [string]$Markdown
    )

    $result = New-Object System.Collections.Generic.List[string]
    $seen = @{}

    $lines = $Markdown -split "`r?`n"

    foreach ($line in $lines) {
        $trimmed = $line.Trim()

        if (-not $trimmed.StartsWith("|")) {
            continue
        }

        $cells = $trimmed.Split("|")

        if ($cells.Count -lt 4) {
            continue
        }

        $cell = $cells[1].Trim()

        if (
            $cell -eq "Identifier" -or
            $cell -match "^:?-+:?$"
        ) {
            continue
        }

        $linkMatch = [regex]::Match(
            $cell,
            '^\[(?<id>[a-z0-9_]+)\]\([^)]+\)$'
        )

        if ($linkMatch.Success) {
            $identifier = $linkMatch.Groups["id"].Value
        }
        else {
            $identifier = $cell.Trim([char]0x60)
        }

        if ($identifier -notmatch '^[a-z0-9_]+$') {
            continue
        }

        # Explicitly documented as a test-only internal entity.
        if ($identifier -eq "undefined_test_only") {
            continue
        }

        Add-Unique $result $seen ("minecraft:" + $identifier)
    }

    return @($result)
}

function Assert-Count {
    param(
        [string]$Kind,
        [object[]]$Values,
        [int]$Minimum
    )

    if ($Values.Count -lt $Minimum) {
        throw "$Kind parse returned only $($Values.Count) values; expected at least $Minimum. Existing Registry was not changed."
    }
}

function New-RegistryJson {
    param(
        [string]$Kind,
        [string]$SourceUrl,
        [object[]]$Ids
    )

    $entries = @()

    foreach ($id in $Ids) {
        $entries += [ordered]@{
            id = [string]$id
        }
    }

    $data = [ordered]@{
        schemaVersion = 1
        platform = "bedrock"
        source = [ordered]@{
            kind = $Kind
            provider = "MicrosoftDocs/minecraft-creator"
            url = $SourceUrl
            fetchedAtUtc = [DateTime]::UtcNow.ToString("o")
        }
        notes = @(
            "Canonical minecraft:* IDs only.",
            "Custom namespace IDs remain supported through direct-input blocks.",
            "Minecraft Education support is NOT inferred from this Bedrock Stable Registry snapshot."
        )
        entries = $entries
    }

    return (
        $data |
        ConvertTo-Json -Depth 8
    )
}

function Convert-ToEnumName {
    param(
        [string]$Id
    )

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
    param(
        [string]$Id
    )

    $pascal = Convert-ToEnumName $Id

    if ($pascal.Length -le 1) {
        return $pascal.ToLowerInvariant()
    }

    return $pascal.Substring(0, 1).ToLowerInvariant() + $pascal.Substring(1)
}

function Update-KoreanRegistryLocalization {
    param(
        [object[]]$Items,
        [object[]]$Blocks,
        [object[]]$Entities
    )

    $path = Join-Path $ProjectRoot "_locales/ko/block_command_maker-strings.json"

    if (-not (Test-Path $path)) {
        Write-Warning "Korean localization file not found; Registry data will still be updated."
        return
    }

    $loc = Get-Content $path -Raw -Encoding UTF8 | ConvertFrom-Json

    foreach ($id in $Items) {
        $fn = Convert-ToCamelFunctionName ([string]$id)
        $key = "MCFunctionItemLibrary.$fn|block"

        $loc |
            Add-Member `
                -NotePropertyName $key `
                -NotePropertyValue ("아이템 " + [string]$id) `
                -Force
    }

    foreach ($id in $Blocks) {
        $fn = Convert-ToCamelFunctionName ([string]$id)
        $key = "MCFunctionBlockLibrary.$fn|block"

        $loc |
            Add-Member `
                -NotePropertyName $key `
                -NotePropertyValue ("블록 " + [string]$id) `
                -Force
    }

    foreach ($id in $Entities) {
        $fn = Convert-ToCamelFunctionName ([string]$id)
        $key = "MCFunctionEntityLibrary.$fn|block"

        $loc |
            Add-Member `
                -NotePropertyName $key `
                -NotePropertyValue ("엔티티 " + [string]$id) `
                -Force
    }

    $json = $loc | ConvertTo-Json -Depth 20
    [System.IO.File]::WriteAllText(
        $path,
        $json.TrimEnd() + "`n",
        $Utf8NoBom
    )

    Write-Host "LOC _locales/ko/block_command_maker-strings.json"
}

function Write-RegistrySource {
    param(
        [string]$RelativePath,
        [string]$Content
    )

    $fullPath = Join-Path $ProjectRoot $RelativePath
    $dir = Split-Path -Parent $fullPath

    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Force -Path $dir | Out-Null
    }

    [System.IO.File]::WriteAllText(
        $fullPath,
        $Content.TrimEnd() + "`n",
        $Utf8NoBom
    )

    Write-Host "SRC $RelativePath"
}

Write-Host ""
Write-Host "=== Official Minecraft Registry Update ==="
Write-Host ""

$itemMarkdown = Get-OfficialText $ItemSourceUrl
$blockMarkdown = Get-OfficialText $BlockSourceUrl
$entityMarkdown = Get-OfficialText $EntitySourceUrl

$items = @(Get-NamespacedCommandEnumIds $itemMarkdown)
$blocks = @(Get-NamespacedCommandEnumIds $blockMarkdown)
$entities = @(Get-OfficialEntityIds $entityMarkdown)

# Conservative guards. If Microsoft changes the Markdown shape, fail safely.
Assert-Count "Item" $items 500
Assert-Count "Block" $blocks 500
Assert-Count "Entity" $entities 100

Write-Host ""
Write-Host "Parsed:"
Write-Host "  Items    : $($items.Count)"
Write-Host "  Blocks   : $($blocks.Count)"
Write-Host "  Entities : $($entities.Count)"
Write-Host ""

if ($DryRun) {
    Write-Host "DryRun: no project files were changed."
    exit 0
}

$backupRoot = Join-Path `
    ([System.IO.Path]::GetTempPath()) `
    ("block_command_maker_registry_backup_" + [Guid]::NewGuid().ToString("N"))

New-Item -ItemType Directory -Force -Path $backupRoot | Out-Null

$trackedFiles = @(
    "registry/source/bedrock/items.json",
    "registry/source/bedrock/blocks.json",
    "registry/source/bedrock/entities.json",
    "_locales/ko/block_command_maker-strings.json"
)

foreach ($relative in $trackedFiles) {
    $source = Join-Path $ProjectRoot $relative

    if (Test-Path $source) {
        $backup = Join-Path $backupRoot $relative
        $backupDir = Split-Path -Parent $backup
        New-Item -ItemType Directory -Force -Path $backupDir | Out-Null
        Copy-Item $source $backup -Force
    }
}

try {
    Write-RegistrySource `
        "registry/source/bedrock/items.json" `
        (New-RegistryJson "command-enum-item" $ItemSourceUrl $items)

    Write-RegistrySource `
        "registry/source/bedrock/blocks.json" `
        (New-RegistryJson "command-enum-block" $BlockSourceUrl $blocks)

    Write-RegistrySource `
        "registry/source/bedrock/entities.json" `
        (New-RegistryJson "vanilla-entity-listing" $EntitySourceUrl $entities)

    Update-KoreanRegistryLocalization $items $blocks $entities

    if (-not $SkipGenerate) {
        Write-Host ""
        Write-Host "Generating TypeScript Registry and Library files..."

        & (Join-Path $PSScriptRoot "generate_registry.ps1")
    }

    Write-Host ""
    Write-Host "Registry update complete."
    Write-Host "Review the generated changes in GitHub Desktop before commit."
}
catch {
    Write-Warning "Registry update failed. Restoring previous source/localization files."

    foreach ($relative in $trackedFiles) {
        $backup = Join-Path $backupRoot $relative
        $target = Join-Path $ProjectRoot $relative

        if (Test-Path $backup) {
            $targetDir = Split-Path -Parent $target
            New-Item -ItemType Directory -Force -Path $targetDir | Out-Null
            Copy-Item $backup $target -Force
        }
    }

    throw
}
finally {
    if (Test-Path $backupRoot) {
        Remove-Item $backupRoot -Recurse -Force
    }
}
