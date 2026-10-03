# Item String ID POC V2 — Shadow Input

## 목적

기존 POC의 `item ID` 문자열 칸은 MakeCode의 **field**로 렌더링되어
`MCFunction Item`의 string reporter 블록을 끼울 수 없었다.

이번 수정은 hidden string shadow block을 사용해 `item ID`를 실제
**value input**으로 만든다.

따라서 한 슬롯에서 둘 다 가능해야 한다.

1. 직접 입력
   - `minecraft:diamond_sword`
2. Library reporter 연결
   - `item ID POC minecraft:diamond_sword`
   - `item ID POC minecraft:copper_spear`

## 변경 파일

- `src/blocks/item_string_id_poc.ts`

Preset / Registry / generator 파일은 수정하지 않는다.

## 테스트

MakeCode 재로드 후 `give item ID POC` 블록을 놓는다.

### A. 직접 입력
기본 shadow 안의 텍스트를 `minecraft:diamond_sword`로 수정하고 실행.

### B. Library 연결
`MCFunction Item`의 `item ID POC minecraft:copper_spear` reporter를
`item ID` 슬롯 위에 끌어다 놓는다.

정상이라면 shadow text 블록이 reporter로 교체되어야 한다.
reporter를 빼면 direct-input shadow가 다시 나타나야 한다.
