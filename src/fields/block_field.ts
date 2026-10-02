/**
 * MakeCode Block value wrapper
 *
 * - 선택 블록: 자주 쓰는 Minecraft 블록을 드롭다운으로 선택
 * - 직접 입력 블록: Custom Namespace / Add-on 블록 ID 입력
 *
 * setblock, fill, can_destroy, can_place_on 등에서 공통 재사용한다.
 */

namespace MCFunctionFields {

    export enum BlockPreset {
        //% block="minecraft:stone"
        Stone = 0,

        //% block="minecraft:dirt"
        Dirt = 1,

        //% block="minecraft:grass_block"
        GrassBlock = 2,

        //% block="minecraft:cobblestone"
        Cobblestone = 3,

        //% block="minecraft:oak_planks"
        OakPlanks = 4,

        //% block="minecraft:glass"
        Glass = 5,

        //% block="minecraft:bedrock"
        Bedrock = 6,

        //% block="minecraft:diamond_block"
        DiamondBlock = 7,

        //% block="minecraft:gold_block"
        GoldBlock = 8,

        //% block="minecraft:iron_block"
        IronBlock = 9,

        //% block="minecraft:redstone_block"
        RedstoneBlock = 10,

        //% block="minecraft:air"
        Air = 11,

        //% block="minecraft:barrier"
        Barrier = 12,

        //% block="minecraft:chest"
        Chest = 13
    }

    export class BlockValue {
        blockId: string;

        constructor(blockId: string) {
            this.blockId = blockId;
        }
    }

    function blockPresetToken(
        preset: BlockPreset
    ): string {

        switch (preset) {

            case BlockPreset.Stone:
                return "minecraft:stone";

            case BlockPreset.Dirt:
                return "minecraft:dirt";

            case BlockPreset.GrassBlock:
                return "minecraft:grass_block";

            case BlockPreset.Cobblestone:
                return "minecraft:cobblestone";

            case BlockPreset.OakPlanks:
                return "minecraft:oak_planks";

            case BlockPreset.Glass:
                return "minecraft:glass";

            case BlockPreset.Bedrock:
                return "minecraft:bedrock";

            case BlockPreset.DiamondBlock:
                return "minecraft:diamond_block";

            case BlockPreset.GoldBlock:
                return "minecraft:gold_block";

            case BlockPreset.IronBlock:
                return "minecraft:iron_block";

            case BlockPreset.RedstoneBlock:
                return "minecraft:redstone_block";

            case BlockPreset.Air:
                return "minecraft:air";

            case BlockPreset.Barrier:
                return "minecraft:barrier";

            case BlockPreset.Chest:
                return "minecraft:chest";

            default:
                return "minecraft:stone";
        }
    }

    //% group="공통 값"
    //% blockId=mcfunction_block_select
    //% block="블록 선택 $preset"
    export function blockSelect(
        preset: BlockPreset
    ): BlockValue {

        return new BlockValue(
            blockPresetToken(preset)
        );
    }

    // 기존 blockId는 직접 입력용으로 유지한다.
    //% group="공통 값"
    //% blockId=mcfunction_block
    //% block="블록 직접 입력 $blockId"
    //% blockId.defl="minecraft:stone"
    export function block(
        blockId: string
    ): BlockValue {

        return new BlockValue(
            blockId
        );
    }
}
