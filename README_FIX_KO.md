# Preset Field 정합성 복구

Preset ID 매핑을 `MCFunctionPresetIds` namespace로 분리한 뒤에도
일부 로컬 Field 파일에 예전 helper 호출이 남아 있을 때 적용하는 패치입니다.

수정 대상:

- `src/fields/item_field.ts`
- `src/fields/block_field.ts`
- `src/fields/entity_field.ts`

정상 호출:

```ts
MCFunctionPresetIds.item(preset)
MCFunctionPresetIds.block(preset)
MCFunctionPresetIds.entity(preset)
```

프로젝트 루트에 그대로 덮어쓴 뒤 다음을 실행하세요.

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\tools\generate_registry.ps1 -Check
```

그리고 잔여 구형 helper 이름이 없는지 확인할 수 있습니다.

```powershell
Get-ChildItem .\src -Recurse -Filter *.ts | Select-String -Pattern 'itemPresetId|blockPresetId|entityPresetId'
```

아무 출력이 없어야 정상입니다.
