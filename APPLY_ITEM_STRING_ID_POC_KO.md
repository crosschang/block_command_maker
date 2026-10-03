# Item String ID POC 적용

현재 프로젝트 루트에 이 ZIP의 내용을 그대로 덮어씁니다.

추가 파일:

- `src/libraries/item_string_id_poc.ts`
- `src/blocks/item_string_id_poc.ts`
- `docs/ITEM_STRING_ID_POC.md`

수정 파일:

- `pxt.json`

기존 Give / ItemValue / Registry generated 파일은 변경하지 않습니다.

## 테스트

MakeCode를 다시 불러온 뒤 `MCFunction Command > Give`에서 `give item ID POC` 블록을 사용합니다.

### A. 직접 입력

`item ID` 칸에 `minecraft:diamond_sword`를 직접 입력하고 실행합니다.

### B. Library 값 연결

`MCFunction Item`에서 `item ID POC minecraft:diamond_sword` 블록을 찾아 같은 `item ID` 칸에 연결하고 실행합니다.

### C. JavaScript -> Blocks

```ts
player.onChat("idlib", function () {
    MCFunctionCommand.giveItemIdStringPoc(
        MCFunctionFields.self(MCFunctionFields.noSelectorCondition()),
        MCFunctionItemLibrary.diamondSwordIdPoc(),
        1
    )
})
```

코드를 바꾼 뒤 Minecraft에 새 프로그램이 배포될 때까지 기다린 후 테스트합니다.
