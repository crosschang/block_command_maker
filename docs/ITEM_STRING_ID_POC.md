# Item String ID POC

목적: MakeCode 블록 UI에서 Item Registry 값을 `ItemValue` 객체가 아닌 `string` ID로 연결했을 때,
직접 입력과 Library reporter가 동일한 Give 입력 슬롯을 공유할 수 있는지 검증한다.

## 테스트 블록

- `give item ID POC`
- `item ID POC minecraft:diamond_sword`
- `item ID POC minecraft:copper_spear`

## A. 직접 입력

`give item ID POC`의 `item ID` 입력에 `minecraft:diamond_sword`를 직접 입력한다.

예상: 다이아몬드 검 지급.

## B. Library reporter 연결

`item ID POC minecraft:diamond_sword` reporter를 같은 `item ID` 입력에 연결한다.

예상: A와 동일하게 다이아몬드 검 지급.

## C. JavaScript -> Blocks

예시:

```ts
player.onChat("idlib", function () {
    MCFunctionCommand.giveItemIdStringPoc(
        MCFunctionFields.self(MCFunctionFields.noSelectorCondition()),
        MCFunctionItemLibrary.diamondSwordIdPoc(),
        1
    )
})
```

Blocks 전환 후 string reporter 연결이 유지되어야 한다.

## PASS 기준

1. 직접 입력 PASS
2. Library string reporter PASS
3. Blocks <-> JavaScript 왕복 PASS
4. Education 실제 실행 PASS

PASS하면 전체 Item Registry generated reporter를 string ID 기반으로 전환하는 설계를 검토한다.
