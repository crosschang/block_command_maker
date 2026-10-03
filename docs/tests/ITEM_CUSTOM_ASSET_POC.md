# Item Custom PNG Asset POC

## 목적

`minecraftItem` native catalog에 없는 최신 아이템도, Extension 자체 PNG를 reporter block 안에 표시할 수 있는지 검증한다.

이번 POC는 `gridpicker`의 이미지 옵션에 data URI PNG를 전달한다. 명령 의미는 기존 `ItemValue` 문자열을 그대로 사용하며 visual parameter는 무시한다.

## 테스트 블록

- `imgasset minecraft:copper_spear` — MakeCode native item catalog에 없어도 되는 synthetic copper spear PNG
- `imgasset my_pack:magic_gem` — Custom Namespace 이미지
- `imgasset my_pack:green_cube` — Custom Namespace 이미지

## 확인 순서

1. `MCFunction Custom Asset POC` 카테고리를 연다.
2. 세 블록 오른쪽에 서로 다른 PNG가 보이는지 확인한다.
3. Toolbox Search에 `imgasset`을 입력한다.
4. 검색 결과에도 이미지가 보이는지 확인한다.
5. `copper_spear`를 검색해 POC 블록과 기존 Registry reporter가 어떻게 함께 표시되는지 확인한다.

## 판정

### PASS

- 세 PNG가 서로 다르게 보임
- `minecraft:copper_spear`에도 자체 PNG 표시
- Toolbox Search 결과에도 PNG 유지

이 경우 다음 단계는 `registry/assets/items.json` + generator로 자동화한다.

### PARTIAL

- 카테고리/워크스페이스에서는 보이지만 Toolbox Search 결과에서는 안 보임

Asset Registry는 유지할 수 있으나 Search UX는 별도 검토한다.

### FAIL

- 이미지가 빈 칸/텍스트/오류로 표시되거나 카테고리 전체가 깨짐

일반 GitHub Extension에서 built-in gridpicker image option을 해당 방식으로 사용할 수 없다고 판단한다.

## 주의

POC PNG 3개는 기능 확인을 위한 synthetic asset이며 실제 Minecraft texture가 아니다.
