# Item String UI Migration

## 목적

MakeCode UI에서 Item ID 전달 방식을 `ItemValue` 객체에서 primitive `string`으로 통일한다.
Core AST / Compiler의 Item 의미 구조는 변경하지 않는다.

## UI 경계

```text
Direct Input ─┐
Quick Preset ─┼─> minecraft:* string ─> Adapter 내부 ItemValue ─> AST ─> Compiler
Full Registry ┘
```

## 사용자에게 보이지 않는 것

명령과 Selector Adapter 내부에서만 `ItemValue`를 로컬 변수로 만든다.
이 값은 MakeCode 변수 블록으로 생성되지 않는다.

## 호환성

- 기존 Full Registry blockId 유지
- Give blockId 유지
- hasitem Selector blockId 유지
- Item AST / Compiler 유지
- POC 전용 블록 제거

## 검증

1. Give 직접 입력 `minecraft:diamond_sword`
2. Give Quick Preset
3. Give Full Registry `diamond_sword` reporter 연결
4. 최신 Registry `minecraft:copper_spear` 연결
5. Selector hasitem 직접 입력 / Registry reporter
6. JavaScript -> Blocks -> JavaScript 왕복
7. 실제 Minecraft Education 실행
