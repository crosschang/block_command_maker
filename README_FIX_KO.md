# Entity Registry singular-name bug fix

## 증상

`src/fields/entity_field.ts`는 `MCFunctionRegistryBedrock.isKnownEntity(...)`를 호출하지만,
생성된 `registry/bedrock/entities.ts`에는 `isKnownEntitie(...)`가 생성되어 TypeScript 오류가 발생합니다.

## 원인

`tools/generate_registry.ps1`에서 복수형 이름을 단수형으로 만들 때:

```powershell
$KindTitle.TrimEnd('s')
```

를 사용하여 `Entities -> Entitie`가 되었습니다.

## 수정

`New-RegistryTs`에 명시적 `$KindSingular` 매개변수를 추가하고 다음처럼 호출합니다.

```powershell
Items    -> Item
Blocks   -> Block
Entities -> Entity
```

따라서 생성 함수는 정상적으로:

```ts
isKnownItem(...)
isKnownBlock(...)
isKnownEntity(...)
```

가 됩니다.

## 적용

ZIP 내용을 프로젝트 루트에 덮어쓰면 됩니다.

대상 파일:

- `tools/generate_registry.ps1`
- `registry/bedrock/entities.ts`

그 다음 MakeCode Extension을 다시 불러오세요.

선택적으로 Registry 생성 검증:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\tools\generate_registry.ps1 -Check
```

또는 일반 생성:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\tools\generate_registry.ps1
```
