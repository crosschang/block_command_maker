# MCFunction Visual IDE — Project Guidelines

## 1. 프로젝트 정의

이 프로젝트는 Minecraft Bedrock / Minecraft Education에서 실제 사용할 수 있는 `.mcfunction` 기반 **양방향 Visual IDE**를 개발하는 프로젝트다.

1차 목표는 수업용 프로그램이 아니라 **실제 제작자가 사용할 수 있는 툴**을 만드는 것이다.

핵심 흐름:

```text
MakeCode Blocks → Block Adapter → Minecraft Command AST → Compiler → .mcfunction
.mcfunction → Parser → Minecraft Command AST → Block Adapter → MakeCode Blocks
```

새 `.mcfunction`을 블록으로 작성할 수 있어야 하며, 기존 `.mcfunction`도 불러와 블록으로 변환·수정·재저장할 수 있어야 한다.

실사용 툴이 안정화된 이후 동일 Core Engine 위에 수업용 모드를 추가한다.

---

## 2. 개발 원칙

- 기존 디지털 리터러시 프로젝트는 UI/GitHub/Extension 구조의 **참고용**으로만 사용한다.
- 이번 프로젝트는 별도 GitHub 저장소 `crosschang/block_command_maker`에서 독립적으로 개발한다.
- 실행/UI 기반은 **Minecraft MakeCode(PXT) GitHub Extension 구조**를 사용한다.
- MakeCode Blocks는 사용자 인터페이스 계층이며, 명령 의미의 원본(Source of Truth)은 Minecraft Command AST로 둔다.
- MakeCode 블록 함수에서 직접 `.mcfunction` 명령 문자열을 조립하는 구조를 핵심 설계로 사용하지 않는다. 블록 입력은 먼저 AST로 변환하고 Compiler가 명령 문자열을 생성한다.
- MakeCode/PXT에 종속되는 블록 정의와 UI 코드는 Core Engine(AST / Parser / Compiler / Validator / Registry)과 분리한다.
- 지원하지 않는 명령은 삭제하지 않고 `Raw Command`로 원본을 보존한다.
- `.mcfunction → Blocks → .mcfunction` Round-trip 과정에서 명령의 의미가 유지되어야 한다.
- 실제 Bedrock / Minecraft Education에서 실행 가능한 결과를 최우선으로 한다.
- Minecraft 버전별 명령 문법과 데이터 차이를 고려한다.
- 최신 명령 문법이나 지원 여부가 중요하면 Microsoft/Minecraft 공식 문서를 확인한다.

---

## 3. 권장 소스 구조

이 프로젝트는 일반 Vite/Node 웹앱이 아니라 **Minecraft MakeCode(PXT) GitHub Extension 저장소**를 기준으로 구성한다.

```text
block_command_maker/
├─ pxt.json                 # MakeCode Extension 설정 / 포함 파일 목록
├─ main.ts                  # MakeCode 진입점 및 공개 블록 API
├─ main.blocks              # MakeCode가 관리하는 블록 워크스페이스 파일
├─ test.ts                  # Extension 자체 테스트 진입점
├─ tsconfig.json            # 편집기/TypeScript 지원용
├─ README.md
│
├─ src/
│  ├─ blocks/               # MakeCode Block ↔ AST Adapter / 블록 정의
│  ├─ fields/               # Selector, Position, Registry 입력 UI 계층
│  ├─ ast/                  # Minecraft Command AST
│  ├─ parser/               # .mcfunction → AST
│  ├─ compiler/             # AST → .mcfunction
│  ├─ validator/            # ERROR / WARNING / INFO 검증
│  └─ project/              # 프로젝트 메타데이터 / import-export
│
├─ registry/
│  ├─ bedrock/
│  └─ education/
│
├─ commands/                # 명령별 AST/Parser/Compiler 정의
├─ tests/                   # 테스트 소스 및 테스트 데이터
├─ examples/
└─ docs/
   └─ PROJECT_GUIDELINES.md
```

### MakeCode/PXT 파일 관리 원칙

- `pxt.json`의 `files`에는 실제 Extension 빌드에 포함되는 TypeScript/Markdown 파일을 명시한다.
- `test.ts`처럼 Extension을 자체 테스트할 때만 필요한 파일은 가능하면 `testFiles`로 관리한다.
- 새 `.ts` 파일을 추가했는데 MakeCode에서 반영되지 않으면 먼저 `pxt.json` 포함 여부를 확인한다.
- `main.ts`는 MakeCode에 노출되는 블록 API와 Adapter 역할을 중심으로 유지하고, Parser/Compiler의 실제 로직을 한 파일에 몰아넣지 않는다.
- `main.blocks`는 MakeCode가 관리하는 워크스페이스 표현이므로 Core Engine의 저장 포맷으로 사용하지 않는다.

### MakeCode Toolbox 명령 카테고리 원칙

- 실제 Minecraft 명령을 실행/생성하는 블록(`give`, `tp`, 향후 `say`, `summon`, `setblock`, `execute` 등)은 **`MCFunction Command` 하나의 카테고리**에 모은다.
- 명령별로 최상위 Toolbox 카테고리를 계속 늘리지 않고, `Give`, `Teleport`, `Execute` 같은 **group**으로 구분한다.
- Selector / Position / Rotation / Item / Block / Entity / Registry Library처럼 여러 명령에서 재사용하는 입력·값 블록은 각각의 공통 카테고리를 유지한다.
- Toolbox 구성 변경 때문에 AST / Parser / Compiler / Registry 계층을 변경하지 않는다.

### MakeCode 명령 블록 레이아웃 원칙

- 블록의 입력/조건이 **3개 이상**이면 기본적으로 `inlineInputMode=external`을 사용하여 세로형으로 표시한다. 이 규칙은 명령 블록뿐 아니라 Selector 조건, Item 조건 등 공통 조립 블록에도 적용한다.
- 세로형 블록은 `|`로 줄을 명시하여 `대상`, `위치`, `아이템`, `개수`, `범위`, `제외`, `다음`, `옵션` 등이 한 행씩 읽히게 한다.
- 입력이 1~2개인 단순 명령은 필요하면 한 줄형을 유지한다.
- 복잡한 명령을 가로로 길게 늘리는 것보다 세로형 상세 블록을 우선한다.
- `execute`, `scoreboard`처럼 자체 구조가 복잡한 명령은 세로형 하나로 모두 합치지 않고 기존 원칙대로 조립형 하위 블록을 사용한다.
- 블록 UI 레이아웃 변경은 UI 계층의 문제이며 AST / Parser / Compiler의 명령 의미에는 영향을 주지 않는다.

초기에는 별도 패키지로 분리하지 않고 **하나의 MakeCode Extension 저장소 안에서 계층을 분리**해 개발한다.

---

## 4. 공통 타입 시스템

각 명령마다 같은 입력 기능을 따로 구현하지 않는다.

다음 공통 타입을 재사용한다.

- Selector
- Position
- Rotation
- Facing
- Anchor
- Number
- Range
- Boolean
- Item
- Block
- Entity
- Particle
- Sound
- Effect
- RawText
- User-defined ID

---

## 5. 고정값과 사용자 정의 값

### Minecraft가 미리 정의한 값

Registry 기반 선택 UI로 제공한다.

예:

- Item
- Block
- Entity
- Particle
- Sound
- Effect
- Enchantment
- GameMode
- GameRule
- Boolean
- eyes / feet
- 기타 고정 enum

### 사용자가 만드는 값

직접 텍스트 입력을 허용한다.

예:

- tag
- scoreboard objective
- fake player
- function 이름
- dialogue scene ID
- custom name
- custom namespace ID

---

## 6. Searchable Registry Field

Item, Block, Entity, Particle, Sound, Effect 등의 입력은 단순 Dropdown으로 제한하지 않는다.

하나의 Registry Field에서 다음을 지원한다.

- 검색
- 목록 선택
- 직접 텍스트 입력
- 자동완성
- Custom Namespace

예:

```text
diamond
→ minecraft:diamond 추천

my_pack:magic_sword
→ 사용자 정의 ID로 허용
```

Registry에 없는 값은 차단하지 않고 Warning을 표시한 뒤 Custom ID로 사용할 수 있게 한다.

---

## 7. Registry

Minecraft 데이터는 코드에 직접 하드코딩하지 않는다.

```text
registry/
├─ bedrock/
│  └─ VERSION/
│     ├─ items.json
│     ├─ blocks.json
│     ├─ entities.json
│     ├─ particles.json
│     ├─ sounds.json
│     └─ effects.json
│
└─ education/
   └─ VERSION/
```

주요 Registry 대상:

- Blocks
- Items
- Entities
- Particles
- Sounds
- Effects
- Enchantments
- GameModes
- GameRules
- Selector Filters
- 기타 고정 enum

새 아이템/블록/엔티티 등이 추가될 경우 가능한 한 Registry 갱신만으로 UI에 반영되도록 한다.

명령 문법 자체가 바뀐 경우 해당 Command Parser / Compiler 모듈만 수정할 수 있게 분리한다.

---

## 8. Selector

기본 Selector:

```text
@a
@e
@p
@r
@s
```

NPC Dialogue Context:

```text
@initiator
```

주요 Selector Filter:

- type
- tag
- name
- gamemode
- distance
- x / y / z
- dx / dy / dz
- count
- level
- rotation
- scores
- family
- hasitem

`tag`, `name`, `scoreboard objective` 등 사용자 정의 값은 직접 입력한다.

Selector Filter는 업데이트 시 확장 가능한 Registry 구조로 만든다.

---

## 9. Position

다음을 모두 지원한다.

절대좌표:

```text
10 64 -20
```

상대좌표:

```text
~ ~1 ~
```

로컬좌표:

```text
^ ^ ^3
```

입력 방식:

1. 간편 위치 블록
2. X/Y/Z 상세 입력
3. 좌표 문자열 직접 입력

직접 입력한 좌표도 Parser가 분석하여 구조화된 Position 데이터로 변환할 수 있어야 한다.

내부 타입은 필요에 따라 구분한다.

```text
Position3D
BlockPosition3D
```

---

## 10. Rotation / Facing / Anchor

### Rotation

- 절대 회전 지원
- `~` 상대 회전 지원
- `^`는 Rotation에 사용하지 않는다.

### Facing Position

- 절대좌표
- `~`
- `^`

모두 지원한다.

### Facing Entity

- Selector
- eyes / feet

### Anchor

- eyes
- feet

Position, Rotation, Facing을 하나의 거대한 블록으로 합치지 않고 재사용 가능한 공통 타입으로 분리한다.

---

## 11. Item System

기본 구조:

```text
ItemStack
├─ Item ID
├─ Amount
├─ Data
└─ Command Components
```

Item ID는 Registry 검색 + 직접 입력을 지원한다.

Command에서 실제 사용할 수 있는 Data Components와 Behavior Pack Custom Item Components를 혼동하지 않는다.

Behavior Pack Custom Item 제작 기능은 향후 별도 Addon 제작 기능으로 분리할 수 있다.

---

## 12. RawText / Lang

RawText Builder에서 다음 요소를 조립식으로 지원한다.

- text
- translate
- selector
- score
- with

공통 사용 대상:

- tellraw
- titleraw
- dialogue

향후 `.lang` 파일 관리 기능과 연계할 수 있게 설계한다.

---

## 13. Dialogue

Dialogue는 `/dialogue` 명령 블록만 제공하는 것으로 끝내지 않는다.

향후 Scene 시스템을 지원할 수 있게 설계한다.

주요 요소:

- Scene ID
- NPC Name
- Text
- On Open
- On Close
- Buttons
- 다음 Scene
- Function 실행

복잡한 버튼 로직은 가능하면 `.mcfunction`으로 분리한다.

---

## 14. V1 핵심 명령

### 메시지

- say
- tell
- tellraw
- title
- titleraw

### 아이템

- give
- clear
- replaceitem

### 플레이어 / 엔티티

- tp / teleport
- summon
- kill
- effect
- tag
- gamemode

### 월드

- setblock
- fill
- clone

### 로직

- scoreboard
- function
- execute

### 기타

- particle
- playsound
- stopsound
- time
- weather
- gamerule
- spawnpoint
- setworldspawn

### Minecraft Education

- ability
- worldbuilder
- immutableworld

Bedrock과 Education의 실제 지원 여부는 버전별로 관리한다.

---

## 15. Execute

Execute를 하나의 거대한 블록으로 만들지 않는다.

조립형 요소:

```text
as
at
in
positioned
rotated
facing
align
anchored
if
unless
run
```

최신 Bedrock Execute 문법을 기준으로 설계한다.

Education에서는 선택한 버전에서 실제 지원되는지 검증한다.

---

## 16. Scoreboard

실사용 수준으로 지원한다.

### Objectives

- add
- remove
- list
- setdisplay

### Players

- set
- add
- remove
- reset
- random
- test
- operation

대상:

- Selector
- Player Name
- Fake Player

Objective 및 Fake Player 이름은 직접 입력 + 자동완성을 허용한다.

---

## 17. 새 프로젝트와 기존 파일

두 흐름을 모두 V1 핵심으로 취급한다.

### 새로 만들기

```text
새 프로젝트
→ 새 Function
→ Blocks 작성
→ .mcfunction 생성
```

### 불러오기

```text
.mcfunction
→ Parser
→ AST
→ Blocks
→ 수정
→ .mcfunction 저장
```

단순 단방향 변환기로 만들지 않는다.

---

## 18. Raw Command

Parser가 지원하지 않는 명령은 삭제하거나 오류로 소실시키지 않는다.

```text
Raw Command
newcommand ...
```

형태로 보존한다.

Minecraft 업데이트로 새로운 명령이 생겨도 기존 프로젝트가 손상되지 않아야 한다.

향후 지원되는 명령은 Raw Command에서 정식 블록으로 재변환할 수 있는 구조를 고려한다.

---

## 19. Round-trip

핵심 테스트:

```text
.mcfunction
→ Parser
→ AST
→ Blocks
→ AST
→ Compiler
→ .mcfunction
```

이 과정에서 명령의 의미가 유지되어야 한다.

텍스트 포맷이 완전히 동일할 필요는 없지만 실제 Minecraft에서의 동작 의미가 달라지면 안 된다.

---

## 20. 프로젝트 저장

Minecraft 실행용 파일과 Visual Editor 데이터를 분리한다.

```text
functions/
└─ main.mcfunction

.mcblock/
└─ project.json
```

`.mcfunction`:
- 실제 Minecraft 실행용

`project.json`:
- 블록 배치
- 연결 관계
- 블록 ID
- UI 위치
- 접힘 상태
- 주석 등

`project.json`이 있으면 정확한 UI를 복원하고, 없으면 `.mcfunction` Parser로 다시 구성한다.

---

## 21. 오류 처리

최소 세 단계:

```text
ERROR
WARNING
INFO
```

ERROR:
실제 명령 실행 불가능

WARNING:
Registry에 없는 Custom ID 등 확인이 필요한 상태

INFO:
플랫폼/버전 관련 안내

가능하면 이유와 수정 방법을 같이 제공한다.

---

## 22. 자동 테스트

필수 테스트:

- Parser Test
- Compiler Test
- Selector Test
- Position Test
- Execute Test
- Scoreboard Test
- Registry Test
- Round-trip Test

실제 Bedrock / Education에서 생성된 `.mcfunction` 실행 검증도 단계적으로 진행한다.

---

## 23. 개발 순서

```text
M0
GitHub Repository (`crosschang/block_command_maker`)
Minecraft MakeCode GitHub Extension 기본 구조
pxt.json / main.ts / test.ts 확인
MakeCode에서 Extension 로드 및 기본 블록 표시 확인

M1
Block Adapter 기본 구조
AST
Selector
Position
Rotation
Facing
RegistryField

M2
say
give
tp
summon
setblock

M3
Compiler
.mcfunction 출력

M4
Parser
.mcfunction → Blocks

M5
tag
scoreboard
function

M6
execute

M7
fill
clone
effect
particle
sound

M8
Project / File 관리
Behavior Pack 불러오기

M9
Bedrock / Education Registry
Version Profile

M10
Validator
Round-trip 자동 테스트
안정화

→ V1.0
```

---

## 24. V1.0 성공 기준

1. 새 프로젝트를 만들 수 있다.
2. 새 `.mcfunction`을 만들 수 있다.
3. 기존 `.mcfunction`을 열 수 있다.
4. 지원 명령은 블록으로 변환된다.
5. 미지원 명령은 Raw Command로 보존된다.
6. 블록을 수정하면 실제 명령이 갱신된다.
7. 다시 `.mcfunction`으로 저장할 수 있다.
8. 생성 결과가 실제 Bedrock / Education에서 실행된다.
9. Selector / Scoreboard / Execute / Function을 실전 수준으로 사용할 수 있다.
10. Round-trip에서 명령 의미가 유지된다.

---

## 25. 향후 수업용 모드

V1 실사용 툴이 안정화된 이후 동일 Core Engine 위에 추가한다.

예:

- 초급 / 중급 / 고급 모드
- 명령어 설명
- 실제 명령어 동시 표시
- 단계별 기능 제한
- 과제
- 자동 검사
- 교사용 기능

교육용 엔진을 별도로 만들지 않는다.

---

## 26. 프로젝트 최종 정의

MCFunction Visual IDE는 **Minecraft MakeCode(PXT)를 블록 UI/Extension 기반으로 사용하여, Minecraft Bedrock 및 Minecraft Education의 실제 `.mcfunction`을 시각적 블록으로 새로 작성하고, 기존 `.mcfunction`을 AST를 통해 블록으로 분석·수정하며, 다시 정상적인 `.mcfunction`으로 저장할 수 있는 양방향 Visual Development Tool**이다.

1차 목표는 실제 제작자가 사용할 수 있는 도구이며, 교육/수업용 모드는 그 이후 동일 Core Engine 위에 확장한다.
