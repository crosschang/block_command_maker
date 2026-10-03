# Registry Search Native Field Probe

목적: Minecraft Education 26.32의 Code Builder / Minecraft MakeCode에서 일반 GitHub Extension이 **등록되지 않은 custom field editor selector**를 직접 사용할 수 있는지 확인한다.

## 이번 테스트에서 건드리지 않는 것

- AST
- Parser
- Compiler
- Validator
- Full Registry
- Give / TP 명령
- Browser Companion / userscript

이번 POC는 `src/fields/registry_search_native_probe.ts` 한 파일에 격리되어 있다.

## 테스트 전 주의

브라우저 콘솔 POC, Tampermonkey/userscript, Edge/Chrome Companion Extension 등 검색창을 주입하는 코드는 **끄고 테스트**한다.

## MakeCode에서 확인할 블록

카테고리:

```text
MCFunction PXT Probe
```

블록 3개:

```text
A. PXT probe A plain dropdown
B. PXT probe B native grid
C. PXT probe C custom field
```

### A — Plain dropdown

정상 enum dropdown이 떠야 한다.

이 단계가 실패하면 custom field 문제가 아니라 POC 파일 자체가 로드되지 않은 것이다.

### B — Native grid

`gridpicker`가 열려 6개의 테스트 값이 Grid로 보여야 한다.

이 단계는 PXT built-in field editor가 정상 작동하는지 확인하는 대조군이다.

### C — Custom field

다음 annotation을 사용한다.

```text
preset.fieldEditor="mcfunction_registry_search"
```

`mcfunction_registry_search`는 Minecraft target에 등록하지 않았다.

관찰할 결과:

1. Extension 자체가 로드되지 않음
2. 카테고리는 보이지만 C 블록만 렌더링 실패
3. 기본 dropdown 등으로 fallback
4. annotation을 무시
5. missing/unknown field editor 관련 오류 표시

## 판정

### C가 실제 custom UI로 열리는 경우

예상 밖의 PASS다. 다음 단계에서 target 내부에 이미 같은 selector가 있는지, 또는 Extension이 어떤 경로로 editor implementation을 찾았는지 추적한다.

### C가 실패 / fallback / 무시되는 경우

일반 GitHub Extension만으로 새로운 native Field Editor implementation을 등록하는 경로는 사용할 수 없다는 근거가 된다.

이 경우 V1 Searchable Registry UI는 다음 중에서 결정한다.

- PXT built-in field 조합
- native gridpicker + 별도 검색/선택 UX
- 승인된 Editor Extension
- PXT / Minecraft target upstream 변경

Browser Companion은 최종 제품 dependency로 사용하지 않는다.

## 테스트 값

```text
minecraft:diamond
minecraft:diamond_sword
minecraft:stone
minecraft:oak_planks
minecraft:zombie
minecraft:armor_stand
```
