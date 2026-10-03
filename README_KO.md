# READY Template + Localization Patch V2

이 버전은 `apply_ready_template.ps1`을 프로젝트 루트로 옮겨 실행해도 동작하도록 수정한 버전입니다.

## 적용

프로젝트 루트 `D:\\block_command_maker`에 `apply_ready_template.ps1`만 복사한 뒤:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\apply_ready_template.ps1 -ProjectRoot .
```

정상 완료:

```text
[ready-template] Migration checks: PASS
```

기존 파일은 `.mcblock/backups/ready-template-...` 아래에 백업됩니다.
