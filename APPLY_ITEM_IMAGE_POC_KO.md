# Item Image POC 적용

기준: `block_command_maker_5_clean_base`

추가/변경 파일:

- `pxt.json`
- `src/libraries/item_visual_poc.ts`
- `registry/assets/items.sample.json`
- `docs/tests/ITEM_IMAGE_POC.md`

이 POC는 AST / Parser / Compiler / Registry 의미 데이터를 변경하지 않습니다.
`minecraftItem` native shadow가 MCFunction reporter block 안과 Toolbox Search 결과에서 아이템 이미지를 렌더링하는지만 검증합니다.
