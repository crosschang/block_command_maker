/**
 * MakeCode Entity value wrapper
 *
 * Registry 연결 버전.
 *
 * EntityPreset의 순서는 registry/bedrock/entities.ts의
 * entityIds() 순서와 같아야 한다.
 */

namespace MCFunctionFields {

    export enum EntityPreset {
        //% block="minecraft:player"
        Player = 0,

        //% block="minecraft:zombie"
        Zombie = 1,

        //% block="minecraft:skeleton"
        Skeleton = 2,

        //% block="minecraft:creeper"
        Creeper = 3,

        //% block="minecraft:armor_stand"
        ArmorStand = 4,

        //% block="minecraft:cow"
        Cow = 5,

        //% block="minecraft:pig"
        Pig = 6,

        //% block="minecraft:sheep"
        Sheep = 7,

        //% block="minecraft:villager"
        Villager = 8,

        //% block="minecraft:iron_golem"
        IronGolem = 9,

        //% block="minecraft:item"
        Item = 10,

        //% block="minecraft:arrow"
        Arrow = 11
    }

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
