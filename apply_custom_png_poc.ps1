$ErrorActionPreference = 'Stop'

$PatchRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$PayloadRoot = Join-Path $PatchRoot 'payload'
$Target = (Get-Location).Path

if (-not (Test-Path $PayloadRoot)) {
    throw "payload folder not found: $PayloadRoot"
}

Write-Host "Applying MCFunction custom PNG asset POC to: $Target"

# Remove previous visual POC artifacts if they exist.
$OldFiles = @(
    'src/libraries/item_visual_poc.ts',
    'docs/tests/ITEM_IMAGE_POC.md',
    'registry/assets/items.sample.json'
)

foreach ($relative in $OldFiles) {
    $path = Join-Path $Target $relative
    if (Test-Path $path) {
        Remove-Item -Force $path
        Write-Host "REMOVED $relative"
    }
}

$Payload = @(
    'pxt.json',
    'src/libraries/item_custom_asset_poc.ts',
    'registry/assets/items.poc.json',
    'registry/assets/poc/copper_spear.png',
    'registry/assets/poc/magic_gem.png',
    'registry/assets/poc/green_cube.png',
    'docs/tests/ITEM_CUSTOM_ASSET_POC.md'
)

foreach ($relative in $Payload) {
    $src = Join-Path $PayloadRoot $relative
    $dst = Join-Path $Target $relative

    if (-not (Test-Path $src)) {
        throw "Missing patch payload: $relative"
    }

    $parent = Split-Path -Parent $dst
    if (-not (Test-Path $parent)) {
        New-Item -ItemType Directory -Force -Path $parent | Out-Null
    }

    $srcFull = [System.IO.Path]::GetFullPath($src)
    $dstFull = [System.IO.Path]::GetFullPath($dst)
    if ($srcFull -ieq $dstFull) {
        Write-Host "SKIPPED self-copy $relative"
        continue
    }

    Copy-Item -Force $src $dst
    Write-Host "COPIED $relative"
}

Write-Host "Custom PNG asset POC applied."
Write-Host "Test Toolbox category: MCFunction Custom Asset POC"
Write-Host "Search keyword: imgasset"
