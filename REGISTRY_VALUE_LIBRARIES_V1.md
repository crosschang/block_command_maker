Registry Value Libraries V1

목표
- Selector 카테고리에서 Entity / Item / Block 값 블록을 분리
- 각각 독립 Toolbox Library로 제공
- 같은 값 타입을 Give / Summon / SetBlock / Fill / Selector 등에서 재사용

새 Toolbox 카테고리
1. MCFunction Entity
   - 엔티티 선택
   - 엔티티 직접 입력
   - Registry 엔티티 검색 블록

2. MCFunction Item
   - 아이템 선택
   - 아이템 직접 입력
   - Registry 아이템 검색 블록
   - 아이템 컴포넌트

3. MCFunction Block
   - 블록 선택
   - 블록 직접 입력
   - Registry 블록 검색 블록

Core 타입은 이동하지 않음
- MCFunctionFields.EntityValue
- MCFunctionFields.ItemValue
- MCFunctionFields.BlockValue

즉 UI Library만 분리하고 AST / Compiler / 공통 Value 계약은 그대로 유지.

호환성
- 기존 blockId 유지:
  mcfunction_entity_select
  mcfunction_entity
  mcfunction_item_select
  mcfunction_item
  mcfunction_block_select
  mcfunction_block
  item component blockIds
  기존 Entity Registry blockIds
- 기존 MCFunctionFields JS API는 block annotation 없이 alias/legacy API로 유지
- 저장된 기존 Block 프로젝트를 최대한 깨뜨리지 않는 방향

검색
- Entity / Item / Block 모두 MakeCode Toolbox Search에 노출
- Registry 데이터가 늘어나면 각 Library 검색 블록도 자동 확장하는 방향

이번 버전
- pxt version 0.1.37 유지
- 아직 0.1.37을 Release하지 않았다면 이 오버레이까지 적용 후 한 번에 Release 권장


자동 생성
- tools/generate_registry.ps1이 이제 세 Library generated 파일을 모두 생성:
  - src/libraries/entity_library.generated.ts
  - src/libraries/item_library.generated.ts
  - src/libraries/block_library.generated.ts
- Registry JSON 수정 후 기존과 동일하게 generator 실행하면 Library 검색 블록도 함께 갱신됨.
