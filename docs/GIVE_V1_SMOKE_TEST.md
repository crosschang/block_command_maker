# Give V1 Smoke Test

Minecraft Education 26.32 / Bedrock stable command syntax 기준의 수동 검증 체크리스트.

## A. Basic Give

블록:

```text
아이템 지급 대상 @s 아이템 minecraft:diamond 개수 3
```

예상 Compiler 결과:

```mcfunction
give @s minecraft:diamond 3 0
```

예상 결과: 다이아몬드 3개 지급.

## B. Full Registry item reporter

Toolbox Search에서 최신 Registry item reporter를 찾아 Basic Give의 item 슬롯에 연결한다.
MakeCode 기본 item picker 데이터가 아니라 MCFunction Item Registry reporter가 연결되어야 한다.

## C. Custom Namespace

```text
my_pack:magic_sword
```

Registry에 없어도 Validator는 WARNING만 생성하며 실행을 차단하지 않는다.
Behavior Pack에 실제 ID가 있으면 Minecraft에서 실행 가능해야 한다.

## D. Advanced - can_destroy

```mcfunction
give @s minecraft:diamond_pickaxe 1 0 {"minecraft:can_destroy":{"blocks":["minecraft:stone"]}}
```

Adventure 모드에서 stone 파괴 가능 여부 확인.

## E. Advanced - can_place_on

`minecraft:can_place_on` blocks 배열이 올바르게 직렬화되는지 확인.

## F. Advanced - item_lock

- lock_in_inventory
- lock_in_slot

각 모드 JSON 출력과 게임 내 동작 확인.

## G. Advanced - keep_on_death

```json
{"minecraft:keep_on_death":{}}
```

사망 후 아이템 유지 여부 확인.

## H. Validation

아래 값은 실행하지 않고 `GIVE ERROR:`를 출력해야 한다.

- amount = 0
- amount = 1.5
- data = 1.5
- item ID에 공백 포함

Registry에 없는 정상 형태의 Custom Namespace는 ERROR가 아니라 WARNING이다.
