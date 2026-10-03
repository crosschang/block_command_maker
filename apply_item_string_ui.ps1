param(
    [string]$ProjectRoot = "."
)

$ErrorActionPreference = "Stop"

$scriptRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$payloadRoot = Join-Path $scriptRoot "payload"
$root = (Resolve-Path $ProjectRoot).Path

Write-Host "[item-string-ui] Project root: $root"

$pxtPath = Join-Path $root "pxt.json"
if (-not (Test-Path $pxtPath)) {
    throw "pxt.json not found under project root: $root"
}

if (-not (Test-Path $payloadRoot)) {
    throw "payload folder not found: $payloadRoot"
}

$stamp = Get-Date -Format "yyyyMMdd_HHmmss"
$backupRoot = Join-Path $root ("migration_backup_item_string_ui_" + $stamp)
New-Item -ItemType Directory -Force -Path $backupRoot | Out-Null

$payloadFiles = Get-ChildItem -Path $payloadRoot -Recurse -File
foreach ($file in $payloadFiles) {
    $relative = $file.FullName.Substring($payloadRoot.Length).TrimStart([char[]]@([char]0x5C, [char]0x2F))
    $dst = Join-Path $root $relative

    if (Test-Path $dst) {
        $backup = Join-Path $backupRoot $relative
        $backupDir = Split-Path -Parent $backup
        if (-not (Test-Path $backupDir)) {
            New-Item -ItemType Directory -Force -Path $backupDir | Out-Null
        }
        Copy-Item -Force $dst $backup
    }

    $dstDir = Split-Path -Parent $dst
    if (-not (Test-Path $dstDir)) {
        New-Item -ItemType Directory -Force -Path $dstDir | Out-Null
    }

    Copy-Item -Force $file.FullName $dst
    Write-Host "[copy] $relative"
}

# Remove POC-only files. Production block IDs are in the normal Item/Give APIs.
$removeFiles = @(
    "src/libraries/item_string_id_poc.ts",
    "src/blocks/item_string_id_poc.ts",
    "docs/ITEM_STRING_ID_POC.md"
)
foreach ($relative in $removeFiles) {
    $path = Join-Path $root $relative
    if (Test-Path $path) {
        $backup = Join-Path $backupRoot $relative
        $backupDir = Split-Path -Parent $backup
        if (-not (Test-Path $backupDir)) {
            New-Item -ItemType Directory -Force -Path $backupDir | Out-Null
        }
        Copy-Item -Force $path $backup
        Remove-Item -Force $path
        Write-Host "[remove] $relative"
    }
}

# Validate pxt.json and its file references before regeneration.
$pxt = Get-Content $pxtPath -Raw -Encoding UTF8 | ConvertFrom-Json
$missing = @()
foreach ($relative in $pxt.files) {
    if (-not (Test-Path (Join-Path $root $relative))) {
        $missing += $relative
    }
}
if ($missing.Count -gt 0) {
    throw ("pxt.json references missing files:`n - " + ($missing -join "`n - "))
}
Write-Host "[check] pxt.json file references: PASS"

# Regenerate from Registry source so generated Item reporter code and generator stay in sync.
$generator = Join-Path $root "tools/generate_registry.ps1"
if (-not (Test-Path $generator)) {
    throw "Registry generator missing: $generator"
}

Push-Location $root
try {
    Write-Host "[generate] registry generated files"
    & $generator

    Write-Host "[check] registry generated files"
    & $generator -Check
}
finally {
    Pop-Location
}

# Migration invariants.
$itemGenerated = Join-Path $root "src/libraries/item_library.generated.ts"
$commandBlocks = Join-Path $root "src/blocks/command_blocks.ts"
$selectorField = Join-Path $root "src/fields/selector_field.ts"
$itemLibrary = Join-Path $root "src/libraries/item_library.ts"

if (Select-String -Path $itemGenerated -Pattern "MCFunctionFields.ItemValue" -Quiet) {
    throw "Generated Item Library still exposes ItemValue. Migration incomplete."
}
if (-not (Select-String -Path $itemGenerated -Pattern "export function .*\(\): string" -Quiet)) {
    throw "Generated Item Library string reporters not found."
}
if (-not (Select-String -Path $commandBlocks -Pattern 'item.shadow="mcfunction_item_id_text_shadow"' -Quiet)) {
    throw "Give Item direct-text shadow not found."
}
if (-not (Select-String -Path $selectorField -Pattern 'item.shadow="mcfunction_item_id_text_shadow"' -Quiet)) {
    throw "Selector hasitem direct-text shadow not found."
}
if (-not (Select-String -Path $itemLibrary -Pattern 'blockId=mcfunction_item_id_text_shadow' -Quiet)) {
    throw "Hidden Item ID text shadow block not found."
}

Write-Host ""
Write-Host "[item-string-ui] Migration checks: PASS"
Write-Host "[item-string-ui] Backup: $backupRoot"
Write-Host "[item-string-ui] Reload/re-import the MakeCode extension before testing."
