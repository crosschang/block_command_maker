# MCFunction Command 세로형 UI 패치

현재 `MCFunction Command` 카테고리의 명령 중 입력이 3개 이상인 블록을 세로형 외부 입력으로 표시합니다.

변경 대상:
- Give 기본
- Give 상세
- Teleport 위치
- Teleport 엔티티
- Teleport 회전
- Teleport 바라볼 위치
- Teleport 바라볼 엔티티

적용:
이 ZIP의 내용을 저장소 루트에 그대로 덮어씁니다.

핵심 규칙:
- 입력 3개 이상: `inlineInputMode=external`
- `|`를 사용해 한 행씩 명시
- AST / Parser / Compiler / Registry는 변경하지 않음
