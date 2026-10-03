# Quick Preset 매핑 버그 수정

## 증상

`아이템 선택 minecraft:stone`을 사용했는데 실제 실행 시 `minecraft:cyan_terracotta`가 지급되는 문제가 발생했다.

## 원인

`ItemPreset.Stone = 0` 같은 Quick Preset enum 값을 Full Registry 배열의 index로 잘못 사용하고 있었다.

예:

```text
ItemPreset.Stone = 0
→ MCFunctionRegistryBedrock.itemIds()[0]
→ minecraft:cyan_terracotta  (잘못됨)
```

Quick Preset의 순서는 `registry/source/presets.json` 기준이며 Full Registry의 정렬 순서와 무관하다.

같은 구조가 BlockPreset / EntityPreset에도 있었기 때문에 함께 수정했다.

## 수정

`registry/source/presets.json`에서 자동 생성되는 다음 매핑 함수를 추가했다.

- `itemPresetId(...)`
- `blockPresetId(...)`
- `entityPresetId(...)`

필드 wrapper는 더 이상 Full Registry 배열 index를 사용하지 않고 전용 preset 매핑을 사용한다.

## 적용 후 확인

Registry 생성기를 한 번 실행:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\tools\generate_registry.ps1
```

검증:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\tools\generate_registry.ps1 -Check
```

MakeCode를 다시 로드한 뒤:

```text
아이템 선택 minecraft:stone
개수 1
```

을 실행하면 실제 `minecraft:stone` 1개가 지급되어야 한다.
