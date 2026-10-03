# Preset ID generated switch brace fix

문제:
`src/fields/registry_preset_ids.generated.ts`에 `switch (preset) {{`가 생성되어 TypeScript 구문 오류가 연쇄 발생함.

수정:
- generated 파일의 세 위치를 `switch (preset) {`로 수정
- `tools/generate_registry.ps1`의 생성 코드도 `switch (preset) {` 상태로 포함

적용 후:
```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\tools\generate_registry.ps1
powershell -NoProfile -ExecutionPolicy Bypass -File .\tools\generate_registry.ps1 -Check
```
