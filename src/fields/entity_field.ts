/**
 * MakeCode Entity value wrapper
 *
 * - 선택 블록: 자주 쓰는 Minecraft 엔티티를 드롭다운으로 선택
 * - 직접 입력 블록: Custom Namespace / Add-on 엔티티 ID 입력
 *
 * Selector type, summon 등에서 공통 재사용한다.
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

        switch (preset) {

            case EntityPreset.Player:
                return "minecraft:player";

            case EntityPreset.Zombie:
                return "minecraft:zombie";

            case EntityPreset.Skeleton:
                return "minecraft:skeleton";

            case EntityPreset.Creeper:
                return "minecraft:creeper";

            case EntityPreset.ArmorStand:
                return "minecraft:armor_stand";

            case EntityPreset.Cow:
                return "minecraft:cow";

            case EntityPreset.Pig:
                return "minecraft:pig";

            case EntityPreset.Sheep:
                return "minecraft:sheep";

            case EntityPreset.Villager:
                return "minecraft:villager";

            case EntityPreset.IronGolem:
                return "minecraft:iron_golem";

            case EntityPreset.Item:
                return "minecraft:item";

            case EntityPreset.Arrow:
                return "minecraft:arrow";

            default:
                return "minecraft:zombie";
        }
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
}
