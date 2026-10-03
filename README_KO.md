# Item String UI 정식 전환 패치

이 패치는 Item ID의 MakeCode UI 경계를 `ItemValue` 객체에서 primitive `string`으로 통일합니다.

## 구조

```text
직접 입력 ─┐
Quick Preset ─┼─> minecraft:* string
Full Registry ─┘
                  ↓
           Adapter 내부 로컬 ItemValue
                  ↓
                 AST
                  ↓
              Compiler
```

내부 `ItemValue`는 사용자 MakeCode 변수로 노출되지 않습니다.

## 적용

패치 ZIP을 프로젝트 루트에 풀고 PowerShell에서 실행:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\apply_item_string_ui.ps1 -ProjectRoot .
```

스크립트가 다음을 자동 처리합니다.

- 변경 파일 백업
- 정식 Item string UI 파일 적용
- 기존 Item String POC 제거
- `pxt.json` 검증
- Registry generated 파일 재생성
- `generate_registry.ps1 -Check`
- Item Library / Give / Selector 연결 검증

## MakeCode 확인

1. Give 아이템 입력칸에 직접 `minecraft:diamond_sword` 입력
2. 같은 슬롯에 Full Registry의 `item minecraft:diamond_sword` reporter 연결
3. `minecraft:copper_spear` reporter 연결
4. Selector `has item`에서도 직접 입력과 Registry reporter 둘 다 연결
5. JavaScript -> Blocks -> JavaScript 왕복 확인
6. Education 인게임 실행 확인

기존 Give / hasitem blockId와 Full Registry Item blockId는 유지합니다.
