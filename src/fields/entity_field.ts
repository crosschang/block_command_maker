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

    /**
     * Quick Preset enum -> Minecraft ID
     *
     * EntityPreset 값은 Full Registry 배열의 index가 아니다.
     * registry/source/presets.json에서 생성된 전용 매핑을 사용한다.
     */
    function entityPresetToken(
        preset: EntityPreset
    ): string {

        return MCFunctionPresetIds.entity(preset);
    }

    export function entitySelect(
        preset: EntityPreset
    ): EntityValue {

        return new EntityValue(
            entityPresetToken(preset)
        );
    }

    // 기존 blockId는 직접 입력용으로 유지한다.
    // Custom Namespace / Add-on 엔티티 ID도 허용한다.
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
