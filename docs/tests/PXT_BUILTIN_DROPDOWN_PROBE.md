# PXT Built-in Dropdown Probe

## 목적
PXT 공식 `numberdropdown` + `fieldOptions.data` 경로가 Minecraft Education의 일반 GitHub Extension에서 동작하는지, 그리고 큰 목록에서 검색 UI가 자동으로 생기는지 확인한다.

## 블록
- `PXT probe I numberdropdown 12`: 12개 extension-owned Minecraft ID
- `PXT probe J numberdropdown 120`: 120개 extension-owned Registry ID

## 판정
1. I/J 모두 일반 dropdown이고 검색창 없음 → extension data는 받지만 Full Registry searchable UI는 아님.
2. J에서 검색창/필터 UI가 생김 → Full Registry용 native 경로 후보.
3. I/J가 렌더되지 않음 → Minecraft target에서 generic field editor 사용 조건 재확인.

이 POC는 AST / Parser / Compiler / Registry를 변경하지 않는다. Browser Companion 또는 DOM 주입을 사용하지 않는다.
