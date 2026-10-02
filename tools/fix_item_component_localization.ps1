param()

$ErrorActionPreference = "Stop"

$ProjectRoot = Split-Path -Parent $PSScriptRoot
$LocPath = Join-Path $ProjectRoot "_locales/ko/block_command_maker-strings.json"

if (-not (Test-Path $LocPath)) {
    throw "Localization file not found: $LocPath"
}

$loc = Get-Content $LocPath -Raw -Encoding UTF8 | ConvertFrom-Json

$patch = [ordered]@{
    "{id:group}Item Components" = "아이템 컴포넌트"

    "MCFunctionItemLibrary.components|block" = "아이템 컴포넌트 없음"
    "MCFunctionItemLibrary.addCanDestroy|block" = "캘 수 있는 블록 %blockValue 추가 다음 %components"
    "MCFunctionItemLibrary.addCanPlaceOn|block" = "설치 가능한 블록 %blockValue 추가 다음 %components"
    "MCFunctionItemLibrary.lockInInventory|block" = "인벤토리에 잠금 다음 %components"
    "MCFunctionItemLibrary.lockInSlot|block" = "슬롯에 잠금 다음 %components"
    "MCFunctionItemLibrary.keepOnDeath|block" = "사망 시 유지 다음 %components"

    # Legacy/core aliases: harmless if hidden, useful if PXT resolves an older symbol cache.
    "MCFunctionFields.itemComponents|block" = "아이템 컴포넌트 없음"
    "MCFunctionFields.addCanDestroy|block" = "캘 수 있는 블록 %blockValue 추가 다음 %components"
    "MCFunctionFields.addCanPlaceOn|block" = "설치 가능한 블록 %blockValue 추가 다음 %components"
    "MCFunctionFields.lockInInventory|block" = "인벤토리에 잠금 다음 %components"
    "MCFunctionFields.lockInSlot|block" = "슬롯에 잠금 다음 %components"
    "MCFunctionFields.keepOnDeath|block" = "사망 시 유지 다음 %components"
}

foreach ($key in $patch.Keys) {
    $loc |
        Add-Member `
            -NotePropertyName $key `
            -NotePropertyValue $patch[$key] `
            -Force
}

$json = $loc | ConvertTo-Json -Depth 30
$Utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText(
    $LocPath,
    $json.TrimEnd() + "`n",
    $Utf8NoBom
)

Write-Host ""
Write-Host "Item Components Korean localization patched."
Write-Host "Updated: _locales/ko/block_command_maker-strings.json"
Write-Host ""
Write-Host "Expected Korean labels:"
Write-Host "  can_destroy  -> 캘 수 있는 블록 ... 추가 다음 ..."
Write-Host "  can_place_on -> 설치 가능한 블록 ... 추가 다음 ..."
Write-Host ""
