# TP + 레지스트리 검색 스모크 테스트 V2

## 소개 @showdialog

이 문서는 **수업용이 아니라 진단용 테스트 튜토리얼**입니다.

버전 확인 표시: `TP-SMOKE-V2-HINT-COLLAPSED`

릴리즈 후 아래 항목이 정상인지 먼저 확인합니다.

1. 튜토리얼 힌트에서 커스텀 블록이 정상 렌더링되는지
2. Registry 엔티티 블록이 MakeCode 검색에 노출되는지
3. TP JavaScript 코드가 Blocks로 정상 변환되는지
4. JavaScript와 Blocks를 왕복해도 TP 블록이 유지되는지

하나라도 실패하면 실제 기초/학습/고급 수업 MD로 복제하지 않습니다.

## 1단계 — 엔티티 검색

MakeCode의 Toolbox 검색창에서 다음을 입력합니다.

`zombie`

`minecraft:zombie`가 포함된 Registry 엔티티 블록들이 검색되는지 확인합니다.

다음도 검색합니다.

`armor_stand`

검색된 블록은 `EntityValue`이므로 선택자의 `type` 조건에 끼울 수 있어야 합니다.

```blocks
let target = MCFunctionFields.allEntities(
    MCFunctionFields.addEntityTypeCondition(
        MCFunctionEntityLibrary.zombie(),
        false,
        MCFunctionFields.noSelectorCondition()
    )
)
```

```ghost
MCFunctionEntityLibrary.zombie()
MCFunctionEntityLibrary.zombieHorse()
MCFunctionEntityLibrary.zombieVillager()
MCFunctionEntityLibrary.armorStand()
MCFunctionFields.entity("my_pack:custom_entity")
```

## 2단계 — 기본 상대좌표 TP

`tp_test` 채팅 명령을 만듭니다.

Minecraft에서 `tp_test`를 입력했을 때 플레이어가 5블록 위로 이동해야 합니다.

```blocks
player.onChat("tp_test", function () {
    MCFunctionTeleport.toPosition(
        MCFunctionFields.self(
            MCFunctionFields.noSelectorCondition()
        ),
        MCFunctionPositionFields.relative(
            0,
            5,
            0
        ),
        false
    )
})
```

## 3단계 — 다른 대상에게 TP

목적지 선택자가 TP 블록 안에서 정상 렌더링되는지 확인합니다.

이 단계의 핵심은 실제 이동보다 **튜토리얼 블록 렌더링 + JavaScript → Blocks 변환 확인**입니다.

```blocks
player.onChat("tp_entity_test", function () {
    MCFunctionTeleport.toEntity(
        MCFunctionFields.self(
            MCFunctionFields.noSelectorCondition()
        ),
        MCFunctionFields.nearestPlayer(
            MCFunctionFields.noSelectorCondition()
        ),
        false
    )
})
```

## 4단계 — 회전

TP 블록 안에 Rotation 값 블록이 정상적으로 들어가는지 확인합니다.

```blocks
player.onChat("tp_rotation_test", function () {
    MCFunctionTeleport.withRotation(
        MCFunctionFields.self(
            MCFunctionFields.noSelectorCondition()
        ),
        MCFunctionPositionFields.relative(
            0,
            0,
            3
        ),
        MCFunctionRotationFields.absolute(
            180,
            0
        ),
        false
    )
})
```

## 5단계 — 위치 바라보기

목적지 Position과 바라볼 Position이 서로 독립된 입력으로 정상 표시되는지 확인합니다.

```blocks
player.onChat("tp_facing_test", function () {
    MCFunctionTeleport.facingPosition(
        MCFunctionFields.self(
            MCFunctionFields.noSelectorCondition()
        ),
        MCFunctionPositionFields.relative(
            0,
            0,
            3
        ),
        MCFunctionPositionFields.relative(
            0,
            0,
            0
        ),
        false
    )
})
```

## 6단계 — Round-trip 확인

실제 수업용 MD로 승격하기 전에 다음을 확인합니다.

1. **Blocks → JavaScript**로 전환합니다.
2. TP 코드가 회색/알 수 없는 블록 없이 생성되는지 확인합니다.
3. **JavaScript → Blocks**로 다시 전환합니다.
4. 같은 TP 블록 구조가 복원되는지 확인합니다.
5. Minecraft Education에서 `tp_test`를 실행합니다.

PASS 기준:

- 튜토리얼이 정상적으로 열린다.
- 모든 힌트 블록이 정상 렌더링된다.
- `zombie`, `armor_stand` 검색이 된다.
- TP 블록이 Blocks ↔ JavaScript 왕복 후 유지된다.
- `tp_test`가 Minecraft Education에서 실행된다.

다섯 항목이 모두 PASS되기 전에는 이 구조를 기초/학습/고급 수업 MD로 복제하지 않습니다.
