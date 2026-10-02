/**
 * MakeCode Entity value wrapper
 *
 * Selector type, summon 등에서 공통으로 사용할
 * 엔티티 ID 입력용 값 블록.
 *
 * 현재는 직접 입력을 사용한다.
 * 이후 Entity Registry 검색/자동완성 UI를 이 타입에 연결한다.
 */

namespace MCFunctionFields {

    export class EntityValue {
        entityId: string;

        constructor(entityId: string) {
            this.entityId = entityId;
        }
    }

    //% group="공통 값"
    //% blockId=mcfunction_entity
    //% block="엔티티 $entityId"
    //% entityId.defl="minecraft:zombie"
    export function entity(
        entityId: string
    ): EntityValue {

        return new EntityValue(
            entityId
        );
    }
}
