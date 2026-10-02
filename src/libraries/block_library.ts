/**
 * Block value library
 *
 * Visible MakeCode blocks live here.
 * Core value type stays MCFunctionFields.BlockValue.
 */

//% color="#58708A" weight=87 icon="\uf1b2" block="MCFunction Block"
//% groups='["select and input", "registry"]'
namespace MCFunctionBlockLibrary {

    //% group="select and input"
    //% weight=100
    //% blockId=mcfunction_block_select
    //% block="block select $preset"
    export function select(
        preset: MCFunctionFields.BlockPreset
    ): MCFunctionFields.BlockValue {

        return MCFunctionFields.blockSelect(preset);
    }

    //% group="select and input"
    //% weight=99
    //% blockId=mcfunction_block
    //% block="block custom id $blockId"
    //% blockId.defl="minecraft:stone"
    export function custom(
        blockId: string
    ): MCFunctionFields.BlockValue {

        return MCFunctionFields.block(blockId);
    }
}
