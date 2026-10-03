# MCFunction Command 통합 패치

기준: `block_command_maker(6).zip`

## 적용

ZIP 내용을 저장소 루트에 그대로 덮어씁니다.
별도 PowerShell 적용 스크립트는 사용하지 않습니다.

## 변경 결과

- 실행 명령 블록은 `MCFunction Command` 카테고리 하나에 표시
- 현재 그룹: `Give`, `Teleport`
- 별도 `MCFunction TP`, `MCFunction Give` 카테고리는 표시하지 않음
- Selector / Position / Rotation / Item / Registry Library는 기존 공통 카테고리 유지
- 기존 `MCFunctionTeleport.*` JavaScript API는 hidden compatibility wrapper로 유지
- 기존 TP blockId 유지
- Give V1 Validator 포함

## Education 확인

1. Extension 다시 불러오기
2. `MCFunction 명령어` 카테고리 확인
3. `아이템 지급`, `순간이동` 그룹 확인
4. 기존 `MCFunction 순간이동` 단독 카테고리가 사라졌는지 확인
5. Give basic / advanced 및 TP 블록 실행 확인
