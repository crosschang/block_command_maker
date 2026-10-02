/**
 * MakeCode Block value wrapper
 *
 * Registry 연결 버전.
 *
 * BlockPreset의 순서는 registry/bedrock/blocks.ts의
 * blockIds() 순서와 같아야 한다.
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

        let ids =
            MCFunctionRegistryBedrock.blockIds();

        let index = preset;

        if (
            index >= 0 &&
            index < ids.length
        ) {
            return ids[index];
        }

        return "minecraft:stone";
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
    // Custom Namespace / Add-on 블록 ID도 허용한다.
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

    export function searchBlockRegistry(
        query: string,
        limit: number
    ): string[] {

        return MCFunctionRegistryBedrock.searchBlocks(
            query,
            limit
        );
    }

    export function isKnownBlockId(
        blockId: string
    ): boolean {

        return MCFunctionRegistryBedrock.isKnownBlock(
            blockId
        );
    }
}
