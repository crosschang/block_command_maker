# Custom PNG POC 패치 적용

1. 이 ZIP을 `D:\block_command_maker` 같은 프로젝트 루트에 압축 해제합니다.
2. 압축을 풀면 `payload/` 폴더와 `apply_custom_png_poc.ps1`가 생깁니다.
3. 프로젝트 루트 PowerShell에서 실행합니다.

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\apply_custom_png_poc.ps1
```

이번 V2 패치는 실제 적용 파일을 `payload/` 아래에 보관하므로 `pxt.json`을 자기 자신으로 복사하는 오류가 발생하지 않습니다.

적용 후 MakeCode Extension을 다시 불러오고:
- `MCFunction Custom Asset POC` 카테고리
- 검색어 `imgasset`
를 확인합니다.
