# 순간이동 수업 — 2교시 (40분) V1

## 다시 시작하기

2교시에는 방향과 로컬 좌표, 복합 선택자, 안전한 순간이동까지 확장합니다.

- 학습 3: 회전과 바라보기
- 고급 1: 로컬 좌표
- 고급 2: 표식 선택자
- 고급 3: 안전한 순간이동

## 학습 3 — 회전과 바라보기 (약 8분)

`tp_turn` 채팅 명령을 만들어 보세요.

3블록 이동한 뒤, 마지막에 바라보는 방향까지 정해봅니다.

### ~ hint

```blocks
player.onChat("tp_turn", function () {
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

### ~

## 고급 1 — 로컬 좌표 (약 9분)

`tp_forward` 채팅 명령을 만들고, **내가 바라보는 방향으로 3블록** 이동해 보세요.

방향을 바꾼 뒤 다시 실행해서 결과를 비교해 봅니다.

### ~ hint

로컬 좌표는 `^`를 사용합니다.

```blocks
player.onChat("tp_forward", function () {
    MCFunctionTeleport.toPosition(
        MCFunctionFields.self(
            MCFunctionFields.noSelectorCondition()
        ),
        MCFunctionPositionFields.local(
            0,
            0,
            3
        ),
        false
    )
})
```

### ~

## 고급 2 — 표식 선택자 만들기 (약 9분)

검색창에서 `armor_stand`를 찾아보세요.

이름이 `TP_MARK`인 아머스탠드 한 개만 선택하도록 조건을 조립합니다.

아머스탠드 표식은 수업 전에 선생님이 미리 준비해 둘 수 있습니다.

### ~ hint

**종류 + 이름 + 대상 수** 조건을 차례로 연결합니다.

```blocks
let marker = MCFunctionFields.allEntities(
    MCFunctionFields.addEntityTypeCondition(
        MCFunctionFields.entityRegistryArmorStand(),
        false,
        MCFunctionFields.addTextCondition(
            MCFunctionFields.SelectorTextConditionType.Name,
            "TP_MARK",
            false,
            MCFunctionFields.addNumberCondition(
                MCFunctionFields.SelectorNumberConditionType.Count,
                1,
                MCFunctionFields.noSelectorCondition()
            )
        )
    )
)
```

### ~

## 고급 3 — 막힌 곳을 확인하고 안전하게 이동하기 (약 8분)

`tp_safe` 채팅 명령을 만들어 보세요.

**블록 충돌 확인**을 켠 뒤, 앞이 비어 있을 때와 막혀 있을 때 결과를 비교합니다.

### ~ hint

블록 충돌 확인이 켜져 있으면 목적지가 막혀 있을 때 순간이동이 실패할 수 있습니다.

```blocks
player.onChat("tp_safe", function () {
    MCFunctionTeleport.toPosition(
        MCFunctionFields.self(
            MCFunctionFields.noSelectorCondition()
        ),
        MCFunctionPositionFields.relative(
            0,
            0,
            3
        ),
        true
    )
})
```

### ~

## 마지막 도전 (약 6분)

아래에서 하나를 골라 도전해 보세요.

1. 선택자 조건과 순간이동을 하나로 조합하기
2. 로컬 좌표로 짧은 이동 코스 만들기
3. 미리 만든 표식으로 이동한 뒤 원하는 대상을 바라보게 만들기
4. `블록 충돌 확인 = 참`이 언제 유용한지 설명하기
