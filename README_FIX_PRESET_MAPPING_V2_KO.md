# Quick Preset 매핑 수정 V2

## 증상
MakeCode에서 generated preset 매핑 함수가 `ItemPreset.Stone` 같은 enum 멤버를 참조할 때
`Cannot find name 'Stone'. Did you mean 'STONE'?` 형태의 컴파일 오류가 발생했다.

## 원인
Preset ID 매핑 함수가 enum **멤버 이름**을 직접 참조하도록 생성되었다.
Minecraft MakeCode/PXT의 block enum 처리 과정에서는 멤버 식별자가 변환될 수 있어,
소스 enum 선언과 같은 철자라도 generated helper 내부 참조가 안전하지 않았다.

## 수정
- enum 선언은 기존 그대로 유지한다. (`Stone = 0`, `Dirt = 1`, ...)
- ID 매핑 함수는 enum 멤버 이름 대신 **같은 source order의 numeric value**를 사용한다.

예:
```ts
switch (preset) {
    case 0:
        return "minecraft:stone";
    case 1:
        return "minecraft:dirt";
}
```

Generator도 같은 방식으로 수정했기 때문에 이후 Registry 재생성에서도 재발하지 않는다.

## 적용 후
```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\tools\generate_registry.ps1
powershell -NoProfile -ExecutionPolicy Bypass -File .\tools\generate_registry.ps1 -Check
```

그 다음 MakeCode Extension을 다시 불러온다.
