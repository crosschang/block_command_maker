
# -------------------------------------------------------------------------
# Registry value library generation migration
# Visible Registry value blocks now belong to:
# - MCFunctionEntityLibrary
# - MCFunctionItemLibrary
# - MCFunctionBlockLibrary
#
# The committed generated files in src/libraries are the current V1 output.
# The next generator pass should emit those three files from Registry JSON.
# -------------------------------------------------------------------------

param(
    [switch]$Check
)

$ErrorActionPreference = "Stop"

$ProjectRoot = Split-Path -Parent $PSScriptRoot

function Read-RegistrySource {
    param(
        [string]$Path
    )

    $fullPath = Join-Path $ProjectRoot $Path

    if (-not (Test-Path $fullPath)) {
        throw "Registry source not found: $fullPath"
    }

    $data = Get-Content $fullPath -Raw -Encoding UTF8 | ConvertFrom-Json

    if ($null -eq $data.entries) {
        throw "Registry source has no entries: $fullPath"
    }

    return @($data.entries)
}

function Convert-ToEnumName {
    param(
        [object]$Entry
    )

    if ($Entry.enumName) {
        return [string]$Entry.enumName
    }

    $id = [string]$Entry.id
    $local = ($id -split ":", 2)[-1]
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

function Get-DisplayLabel {
    param(
        [object]$Entry
    )

    if ($Entry.label) {
        return [string]$Entry.label
    }

    return [string]$Entry.id
}

function Escape-TsString {
    param(
        [string]$Value
    )

    return $Value.Replace("\", "\\").Replace('"', '\"')
}

function Assert-RegistryEntries {
    param(
        [object[]]$Entries,
        [string]$Kind
    )

    $ids = @{}
    $enumNames = @{}

    foreach ($entry in $Entries) {
        $id = [string]$entry.id

        if ([string]::IsNullOrWhiteSpace($id)) {
            throw "$Kind Registry contains an empty id."
        }

        if ($ids.ContainsKey($id)) {
            throw "$Kind Registry contains duplicate id: $id"
        }

        $ids[$id] = $true

        $enumName = Convert-ToEnumName $entry

        if ($enumNames.ContainsKey($enumName)) {
            throw "$Kind Registry enum name collision: $enumName. Add an explicit enumName in the JSON source."
        }

        $enumNames[$enumName] = $true
    }
}

function New-RegistryTs {
    param(
        [object[]]$Entries,
        [string]$KindLower,
        [string]$KindTitle
    )

    $lines = New-Object System.Collections.Generic.List[string]

    $lines.Add("/**")
    $lines.Add(" * AUTO-GENERATED FILE. DO NOT EDIT BY HAND.")
    $lines.Add(" *")
    $lines.Add(" * Source: registry/source/bedrock/$KindLower.json")
    $lines.Add(" * Generator: tools/generate_registry.ps1")
    $lines.Add(" */")
    $lines.Add("")
    $lines.Add("namespace MCFunctionRegistryBedrock {")
    $lines.Add("")
    $lines.Add("    export function ${KindLower}Ids(): string[] {")
    $lines.Add("")
    $lines.Add("        return [")

    for ($i = 0; $i -lt $Entries.Count; $i++) {
        $id = Escape-TsString ([string]$Entries[$i].id)
        $comma = if ($i -lt $Entries.Count - 1) { "," } else { "" }
        $lines.Add("            `"$id`"$comma")
    }

    $lines.Add("        ];")
    $lines.Add("    }")
    $lines.Add("")
    $lines.Add("    export function search$KindTitle(")
    $lines.Add("        query: string,")
    $lines.Add("        limit: number")
    $lines.Add("    ): string[] {")
    $lines.Add("")
    $lines.Add("        return MCFunctionRegistry.searchIds(")
    $lines.Add("            ${KindLower}Ids(),")
    $lines.Add("            query,")
    $lines.Add("            limit")
    $lines.Add("        );")
    $lines.Add("    }")
    $lines.Add("")
    $lines.Add("    export function isKnown$($KindTitle.TrimEnd('s'))(")
    $lines.Add("        id: string")
    $lines.Add("    ): boolean {")
    $lines.Add("")
    $lines.Add("        return MCFunctionRegistry.containsId(")
    $lines.Add("            ${KindLower}Ids(),")
    $lines.Add("            id")
    $lines.Add("        );")
    $lines.Add("    }")
    $lines.Add("}")
    $lines.Add("")

    return ($lines -join "`n")
}

function New-PresetEnum {
    param(
        [object[]]$Entries,
        [string]$EnumName
    )

    $lines = New-Object System.Collections.Generic.List[string]

    $lines.Add("    export enum $EnumName {")

    for ($i = 0; $i -lt $Entries.Count; $i++) {
        $enumName = Convert-ToEnumName $Entries[$i]
        $label = Escape-TsString (Get-DisplayLabel $Entries[$i])

        $lines.Add("        //% block=`"$label`"")
        $comma = if ($i -lt $Entries.Count - 1) { "," } else { "" }
        $lines.Add("        $enumName = $i$comma")

        if ($i -lt $Entries.Count - 1) {
            $lines.Add("")
        }
    }

    $lines.Add("    }")

    return ($lines -join "`n")
}

function New-PresetTs {
    param(
        [object[]]$Items,
        [object[]]$Blocks,
        [object[]]$Entities
    )

    $itemEnum = New-PresetEnum $Items "ItemPreset"
    $blockEnum = New-PresetEnum $Blocks "BlockPreset"
    $entityEnum = New-PresetEnum $Entities "EntityPreset"

    return @"
/**
 * AUTO-GENERATED FILE. DO NOT EDIT BY HAND.
 *
 * Sources:
 * - registry/source/bedrock/items.json
 * - registry/source/bedrock/blocks.json
 * - registry/source/bedrock/entities.json
 *
 * Generator:
 * - tools/generate_registry.ps1
 *
 * MakeCode enum dropdowns must exist at compile time, so this generated
 * TypeScript file is committed to Git and included by pxt.json.
 */

namespace MCFunctionFields {

$itemEnum

$blockEnum

$entityEnum
}
"@
}


function Convert-ToSafeBlockIdPart {
    param(
        [string]$Value
    )

    return [regex]::Replace(
        $Value.Replace(":", "_"),
        "[^A-Za-z0-9_]+",
        "_"
    )
}

function Convert-ToCamelFunctionName {
    param(
        [object]$Entry
    )

    $pascal = Convert-ToEnumName $Entry

    if ($pascal.Length -le 1) {
        return $pascal.ToLowerInvariant()
    }

    return $pascal.Substring(0, 1).ToLowerInvariant() + $pascal.Substring(1)
}

function New-RegistryLibraryBlocksTs {
    param(
        [object[]]$Entries,
        [string]$KindLower,
        [string]$NamespaceName,
        [string]$ValueType,
        [string]$LegacyPrefix
    )

    $lines = New-Object System.Collections.Generic.List[string]

    $lines.Add("/**")
    $lines.Add(" * AUTO-GENERATED FILE. DO NOT EDIT BY HAND.")
    $lines.Add(" *")
    $lines.Add(" * Source: registry/source/bedrock/${KindLower}s.json")
    $lines.Add(" * Generator: tools/generate_registry.ps1")
    $lines.Add(" */")
    $lines.Add("")
    $lines.Add("namespace $NamespaceName {")
    $lines.Add("")

    for ($i = 0; $i -lt $Entries.Count; $i++) {
        $entry = $Entries[$i]
        $id = Escape-TsString ([string]$entry.id)
        $functionName = Convert-ToCamelFunctionName $entry
        $blockIdPart = Convert-ToSafeBlockIdPart ([string]$entry.id)
        $weight = [Math]::Max(1, 200 - $i)

        $lines.Add("    //% group=`"Registry`"")
        $lines.Add("    //% weight=$weight")
        $lines.Add("    //% blockId=mcfunction_${KindLower}_registry_$blockIdPart")
        $lines.Add("    //% block=`"$KindLower $id`"")
        $lines.Add("    export function $functionName(): MCFunctionFields.$ValueType {")
        $lines.Add("        return new MCFunctionFields.$ValueType(`"$id`");")
        $lines.Add("    }")
        $lines.Add("")
    }

    $lines.Add("}")
    $lines.Add("")
    $lines.Add("/** Legacy JS API aliases. No Toolbox blocks here. */")
    $lines.Add("namespace MCFunctionFields {")
    $lines.Add("")

    foreach ($entry in $Entries) {
        $functionName = Convert-ToCamelFunctionName $entry
        $pascal = Convert-ToEnumName $entry

        $lines.Add("    export function $LegacyPrefix$pascal(): $ValueType {")
        $lines.Add("        return $NamespaceName.$functionName();")
        $lines.Add("    }")
        $lines.Add("")
    }

    $lines.Add("}")
    $lines.Add("")

    return ($lines -join "`n")
}

function Write-Or-Check {
    param(
        [string]$RelativePath,
        [string]$Content
    )

    $fullPath = Join-Path $ProjectRoot $RelativePath
    $normalized = $Content.Replace("`r`n", "`n").TrimEnd() + "`n"

    if ($Check) {
        if (-not (Test-Path $fullPath)) {
            throw "Generated file missing: $RelativePath"
        }

        $existing = (Get-Content $fullPath -Raw -Encoding UTF8).Replace("`r`n", "`n")

        if ($existing -ne $normalized) {
            throw "Generated file is out of date: $RelativePath`nRun: powershell -ExecutionPolicy Bypass -File .\tools\generate_registry.ps1"
        }

        Write-Host "OK  $RelativePath"
        return
    }

    $dir = Split-Path -Parent $fullPath

    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Force -Path $dir | Out-Null
    }

    [System.IO.File]::WriteAllText(
        $fullPath,
        $normalized,
        [System.Text.UTF8Encoding]::new($false)
    )

    Write-Host "GEN $RelativePath"
}

$items = Read-RegistrySource "registry/source/bedrock/items.json"
$blocks = Read-RegistrySource "registry/source/bedrock/blocks.json"
$entities = Read-RegistrySource "registry/source/bedrock/entities.json"

Assert-RegistryEntries $items "Item"
Assert-RegistryEntries $blocks "Block"
Assert-RegistryEntries $entities "Entity"

Write-Or-Check `
    "registry/bedrock/items.ts" `
    (New-RegistryTs $items "item" "Items")

Write-Or-Check `
    "registry/bedrock/blocks.ts" `
    (New-RegistryTs $blocks "block" "Blocks")

Write-Or-Check `
    "registry/bedrock/entities.ts" `
    (New-RegistryTs $entities "entity" "Entities")

Write-Or-Check `
    "src/fields/registry_presets.generated.ts" `
    (New-PresetTs $items $blocks $entities)

Write-Or-Check `
    "src/libraries/entity_library.generated.ts" `
    (New-RegistryLibraryBlocksTs $entities "entity" "MCFunctionEntityLibrary" "EntityValue" "entityRegistry")

Write-Or-Check `
    "src/libraries/item_library.generated.ts" `
    (New-RegistryLibraryBlocksTs $items "item" "MCFunctionItemLibrary" "ItemValue" "itemRegistry")

Write-Or-Check `
    "src/libraries/block_library.generated.ts" `
    (New-RegistryLibraryBlocksTs $blocks "block" "MCFunctionBlockLibrary" "BlockValue" "blockRegistry")

if ($Check) {
    Write-Host ""
    Write-Host "Registry generated files are up to date."
}
else {
    Write-Host ""
    Write-Host "Registry generation complete."
}
