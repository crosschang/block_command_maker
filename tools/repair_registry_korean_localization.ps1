param()

$ErrorActionPreference = "Stop"

$ProjectRoot = Split-Path -Parent $PSScriptRoot
$Utf8NoBom = New-Object System.Text.UTF8Encoding($false)

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

function Get-KoreanRegistryPrefix {
    param(
        [string]$Kind
    )

    # ASCII-only PowerShell source; construct Korean with Unicode code points.
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

    return ""
}

function Read-RegistryIds {
    param(
        [string]$RelativePath
    )

    $path = Join-Path $ProjectRoot $RelativePath

    if (-not (Test-Path $path)) {
        throw "Registry source not found: $path"
    }

    $data = Get-Content $path -Raw -Encoding UTF8 | ConvertFrom-Json
    return @($data.entries | ForEach-Object { [string]$_.id })
}

$locPath = Join-Path $ProjectRoot "_locales/ko/block_command_maker-strings.json"

if (-not (Test-Path $locPath)) {
    throw "Localization file not found: $locPath"
}

$loc = Get-Content $locPath -Raw -Encoding UTF8 | ConvertFrom-Json

$items = Read-RegistryIds "registry/source/bedrock/items.json"
$blocks = Read-RegistryIds "registry/source/bedrock/blocks.json"
$entities = Read-RegistryIds "registry/source/bedrock/entities.json"

foreach ($id in $items) {
    $fn = Convert-ToCamelFunctionName $id
    $key = "MCFunctionItemLibrary.$fn|block"

    $loc |
        Add-Member `
            -NotePropertyName $key `
            -NotePropertyValue ((Get-KoreanRegistryPrefix "item") + $id) `
            -Force
}

foreach ($id in $blocks) {
    $fn = Convert-ToCamelFunctionName $id
    $key = "MCFunctionBlockLibrary.$fn|block"

    $loc |
        Add-Member `
            -NotePropertyName $key `
            -NotePropertyValue ((Get-KoreanRegistryPrefix "block") + $id) `
            -Force
}

foreach ($id in $entities) {
    $fn = Convert-ToCamelFunctionName $id
    $key = "MCFunctionEntityLibrary.$fn|block"

    $loc |
        Add-Member `
            -NotePropertyName $key `
            -NotePropertyValue ((Get-KoreanRegistryPrefix "entity") + $id) `
            -Force
}

$json = $loc | ConvertTo-Json -Depth 20

[System.IO.File]::WriteAllText(
    $locPath,
    $json.TrimEnd() + "`n",
    $Utf8NoBom
)

Write-Host ""
Write-Host "Registry Korean localization repaired."
Write-Host "Items    : $($items.Count)"
Write-Host "Blocks   : $($blocks.Count)"
Write-Host "Entities : $($entities.Count)"
Write-Host ""
Write-Host "Next: commit the localization JSON and create a new MakeCode release."
