/**
 * Minecraft target-native picker probe — shadowOptions comparison
 *
 * PURPOSE
 * - D is the known-good minecraftBlock baseline.
 * - E uses the exact same target shadow but adds ONE extension-side option:
 *     block.shadowOptions.columns=3
 * - This isolates whether PXT forwards extension shadowOptions into the
 *   target-owned minecraftBlock picker.
 *
 * IMPORTANT
 * - POC only. No AST / Parser / Compiler / Registry behavior is changed.
 * - Do not use browser-side injection while testing.
 */

namespace MCFunctionRegistrySearchProbe {

    /**
     * Probe D: known-good official Minecraft target shadow.
     */
    //% group="Native Field Probe"
    //% weight=97
    //% blockId=mcfunction_registry_probe_minecraft_block_shadow_number
    //% block="PXT probe D minecraftBlock baseline $block"
    //% block.shadow=minecraftBlock
    export function minecraftBlockNativeNumber(block: number): number {
        return block;
    }

    /**
     * Probe E: same minecraftBlock shadow, with ONE shadow option.
     *
     * Expected evidence if the target picker accepts propagated options:
     * its grid layout should differ from D (requested 3 columns).
     *
     * If the picker stays identical to D, this specific option is either
     * ignored by minecraftBlock or not consumed by that target field editor.
     */
    //% group="Native Field Probe"
    //% weight=96
    //% blockId=mcfunction_registry_probe_minecraft_block_shadow_columns
    //% block="PXT probe E minecraftBlock columns=3 $block"
    //% block.shadow=minecraftBlock
    //% block.shadowOptions.columns=3
    export function minecraftBlockNativeColumns(block: number): number {
        return block;
    }
}
