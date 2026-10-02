/**
 * MakeCode Entity value wrapper
 *
 * Registry 연결 버전.
 *
 * EntityPreset은 src/fields/registry_presets.generated.ts에서 자동 생성된다.
 * 실제 Minecraft ID의 Source of Truth는 registry/source/bedrock/entities.json이다.
 */

namespace MCFunctionFields {


    export class EntityValue {
        entityId: string;

        constructor(entityId: string) {
            this.entityId = entityId;
        }
    }

    function entityPresetToken(
        preset: EntityPreset
    ): string {

        let ids =
            MCFunctionRegistryBedrock.entityIds();

        let index = preset;

        if (
            index >= 0 &&
            index < ids.length
        ) {
            return ids[index];
        }

        return "minecraft:zombie";
    }

    //% group="공통 값"
    //% blockId=mcfunction_entity_select
    //% block="엔티티 선택 $preset"
    export function entitySelect(
        preset: EntityPreset
    ): EntityValue {

        return new EntityValue(
            entityPresetToken(preset)
        );
    }

    // 기존 blockId는 직접 입력용으로 유지한다.
    // Custom Namespace / Add-on 엔티티 ID도 허용한다.
    //% group="공통 값"
    //% blockId=mcfunction_entity
    //% block="엔티티 직접 입력 $entityId"
    //% entityId.defl="minecraft:zombie"
    export function entity(
        entityId: string
    ): EntityValue {

        return new EntityValue(
            entityId
        );
    }

    export function searchEntityRegistry(
        query: string,
        limit: number
    ): string[] {

        return MCFunctionRegistryBedrock.searchEntities(
            query,
            limit
        );
    }

    export function isKnownEntityId(
        entityId: string
    ): boolean {

        return MCFunctionRegistryBedrock.isKnownEntity(
            entityId
        );
    }
}
