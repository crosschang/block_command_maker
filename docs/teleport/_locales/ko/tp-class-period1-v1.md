# 순간이동 수업 — 1교시 (40분) V1

## 시작하기

오늘은 네 가지 미션으로 순간이동의 기본을 익혀봅니다.

- 기초 1: 절대 좌표
- 기초 2: 상대 좌표
- 학습 1: 선택자 + 엔티티 검색
- 학습 2: 다른 대상에게 순간이동

블록 모양이 헷갈릴 때만 **힌트**를 열어보세요.

## 기초 1 — 절대 좌표 (약 8분)

`tp_abs` 채팅 명령을 만들고, 선생님이 알려준 좌표로 자신을 이동해 보세요.

### ~ hint

**순간이동 → 위치** 블록과 **절대 좌표** 블록을 사용합니다.

```blocks
player.onChat("tp_abs", function () {
    MCFunctionTeleport.toPosition(
        MCFunctionFields.self(
            MCFunctionFields.noSelectorCondition()
        ),
        MCFunctionPositionFields.absolute(
            0,
            70,
            0
        ),
        false
    )
})
```

### ~

## 기초 2 — 상대 좌표 (약 8분)

`tp_up` 채팅 명령을 만들고, 현재 위치에서 5블록 위로 이동해 보세요.

### ~ hint

`~`는 **지금 있는 위치를 기준으로 한다**는 뜻입니다.

```blocks
player.onChat("tp_up", function () {
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

### ~

## 학습 1 — 엔티티를 검색해서 종류 조건에 넣기 (약 9분)

도구 상자 검색창에 `zombie`를 입력해 보세요.

검색된 `minecraft:zombie` 엔티티 블록을 선택자의 **종류(type)** 칸에 끼워 넣습니다.

### ~ hint

검색된 엔티티 블록은 선택자의 `type` 조건에 바로 사용할 수 있습니다.

```blocks
let zombieTarget = MCFunctionFields.allEntities(
    MCFunctionFields.addEntityTypeCondition(
        MCFunctionEntityLibrary.zombie(),
        false,
        MCFunctionFields.noSelectorCondition()
    )
)
```

```ghost
MCFunctionEntityLibrary.zombie()
MCFunctionEntityLibrary.armorStand()
```

### ~

## 학습 2 — 다른 대상에게 순간이동 (약 9분)

`tp_friend` 채팅 명령을 만들고, 자신을 가장 가까운 플레이어에게 이동해 보세요.

### ~ hint

**이동할 대상**과 **도착할 대상**을 각각 선택자로 정합니다.

```blocks
player.onChat("tp_friend", function () {
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

### ~

## 정리하기 (약 6분)

다음 질문을 하나씩 확인해 봅시다.

1. 절대 좌표와 상대 좌표는 무엇이 다를까요?
2. `@s`는 누구를 뜻할까요?
3. `armor_stand`를 검색해서 종류(type) 칸에 넣을 수 있나요?
4. 오늘 만든 명령 하나를 다시 실행하고, 블록이 어떤 역할을 하는지 설명해 보세요.
