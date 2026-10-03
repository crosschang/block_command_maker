/**
 * Minecraft target-native picker probe — isolated D-only test
 *
 * This file intentionally contains ONE new block only.
 * It follows the official Minecraft MakeCode extension example exactly:
 * a number parameter named `block` with `block.shadow=minecraftBlock`.
 *
 * Purpose: determine whether the previous empty toolbox was caused by the
 * experimental BlockValue / ItemValue shadow bindings, rather than by the
 * native minecraftBlock shadow itself.
 */

namespace MCFunctionRegistrySearchProbe {

    /**
     * Probe D: official Minecraft target shadow, isolated.
     * @param block Minecraft block/item numeric value selected by target picker
     */
    //% group="Native Field Probe"
    //% weight=97
    //% blockId=mcfunction_registry_probe_minecraft_block_shadow_number
    //% block="PXT probe D minecraftBlock native $block"
    //% block.shadow=minecraftBlock
    export function minecraftBlockNativeNumber(block: number): number {
        return block;
    }
}
