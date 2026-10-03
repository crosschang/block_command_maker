# Minecraft Target-Native Picker Probe

## 목적

브라우저 확장이나 DOM 주입 없이 Minecraft MakeCode target에 이미 등록된 네이티브 picker를 GitHub Extension에서 재사용할 수 있는지 확인한다.

이번 Probe는 기존 A/B/C 실험을 유지하고 D/E/F/G를 추가한다.

## D — 공식 `minecraftBlock` shadow / `number`

블록:

```text
PXT probe D minecraftBlock native [...]
```

확인:

1. 블록 안에 Minecraft 기본 block/item 선택 UI가 표시되는가?
2. 선택 UI를 열었을 때 검색 입력이 있는가?
3. `diamond`, `diamond_sword`, `stone` 등을 찾을 수 있는가?
4. 최근 버전 값도 얼마나 들어 있는지 확인한다.
5. 값을 하나 선택한 뒤 JavaScript 보기로 전환하여 생성된 표현식을 확인한다.

이 D가 가장 중요하다. 공식 Minecraft MakeCode extension 문서에서 custom extension parameter에 `material.shadow=minecraftBlock`와 같은 패턴을 허용한다.

## E — `minecraftBlock` shadow → `MCFunctionFields.BlockValue`

확인:

- shadow가 정상 연결되는가?
- 빈 입력이 되는가?
- 타입 오류/회색 블록/분리 현상이 생기는가?

D는 성공하고 E는 실패하면 target picker 자체는 재사용 가능하지만 현재 `BlockValue`와 직접 타입 호환되지는 않는다는 뜻이다.

## F — `minecraftBlock` shadow → `MCFunctionFields.ItemValue`

E와 같은 방식으로 ItemValue 직접 호환 가능성을 본다.

## G — MakeCode Toolbox Search

Toolbox Search에 다음 중 하나를 입력한다.

```text
mcfnativeprobe
```

또는

```text
diamond sentinel
```

`mcfnativeprobe diamond sentinel` 블록이 검색 결과에 나오면 Extension 블록도 네이티브 Toolbox Search 인덱스에 들어간다는 뜻이다.

## 판정표

```text
D picker 표시 + picker 내부 검색 존재
→ 가장 유망. Minecraft target-native picker 재사용 경로를 우선 조사.

D picker 표시 + 내부 검색 없음
→ target shadow 재사용은 가능하지만 Searchable Registry 요구는 별도 해결 필요.

D 성공 / E,F 실패
→ number 기반 Minecraft 값과 MCFunction AST wrapper 사이 변환 Adapter 필요.

G 성공
→ Full Registry reporter block + Toolbox Search를 V1 native fallback 후보로 사용할 수 있음.
```

## 주의

이 파일은 capability probe다. AST / Parser / Compiler / Registry의 Source of Truth 구조를 변경하지 않는다.
