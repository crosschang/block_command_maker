/**
 * Minecraft target-native picker probe
 *
 * PURPOSE
 * - Test a picker that is already registered by the Minecraft MakeCode target.
 * - Official Minecraft MakeCode extension documentation explicitly supports
 *   parameter.shadow=minecraftBlock in third-party/custom extension blocks.
 * - Compare target-native picker reuse with our own BlockValue / ItemValue types.
 * - Confirm whether normal MakeCode Toolbox Search indexes extension blocks.
 *
 * IMPORTANT
 * - POC only. No AST / Parser / Compiler / Registry behavior is changed here.
 * - Do not use browser-side injection while running this probe.
 */

namespace MCFunctionRegistrySearchProbe {

    /**
     * Probe D (control): officially supported Minecraft target shadow.
     *
     * Expected behavior:
     * - A native Minecraft block/item selection shadow is attached.
     * - The parameter type is number, matching the Minecraft MakeCode API.
     */
    //% group="Native Field Probe"
    //% weight=97
    //% blockId=mcfunction_registry_probe_minecraft_block_shadow_number
    //% block="PXT probe D minecraftBlock native $material"
    //% material.shadow=minecraftBlock
    export function minecraftBlockNativeNumber(
        material: number
    ): number {
        return material;
    }

    /**
     * Probe E: try the same trusted Minecraft target shadow on our BlockValue.
     *
     * This intentionally tests type compatibility only. If the editor refuses,
     * omits, or detaches the shadow, minecraftBlock cannot be plugged directly
     * into the current BlockValue adapter without a conversion layer.
     */
    //% group="Native Field Probe"
    //% weight=96
    //% blockId=mcfunction_registry_probe_minecraft_block_shadow_blockvalue
    //% block="PXT probe E minecraftBlock to BlockValue $material"
    //% material.shadow=minecraftBlock
    export function minecraftBlockToBlockValue(
        material: MCFunctionFields.BlockValue
    ): MCFunctionFields.BlockValue {
        return material;
    }

    /**
     * Probe F: try the trusted Minecraft target shadow on our ItemValue.
     *
     * Minecraft MakeCode represents many block/item constants through the same
     * numeric Minecraft block/item value system. This checks whether the shadow
     * can directly satisfy our ItemValue input (it is expected that it cannot).
     */
    //% group="Native Field Probe"
    //% weight=95
    //% blockId=mcfunction_registry_probe_minecraft_block_shadow_itemvalue
    //% block="PXT probe F minecraftBlock to ItemValue $material"
    //% material.shadow=minecraftBlock
    export function minecraftBlockToItemValue(
        material: MCFunctionFields.ItemValue
    ): MCFunctionFields.ItemValue {
        return material;
    }

    /**
     * Probe G: unique Toolbox Search sentinel.
     *
     * Search the MakeCode Toolbox for either:
     *   mcfnativeprobe
     * or:
     *   diamond sentinel
     *
     * If this block appears in native Toolbox Search, generated registry reporter
     * blocks can be a no-browser-extension fallback for Full Registry search.
     */
    //% group="Native Field Probe"
    //% weight=94
    //% blockId=mcfunction_registry_probe_toolbox_search_sentinel
    //% block="mcfnativeprobe diamond sentinel"
    export function toolboxSearchSentinel(): string {
        return "minecraft:diamond";
    }
}
