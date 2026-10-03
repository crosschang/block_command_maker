/**
 * Minecraft target-native catalog probe
 *
 * PURPOSE
 * - D: re-confirm the target-owned searchable block picker.
 * - F: test the documented target-owned minecraftItem shadow.
 * - G: test target API blocks.blockByName(name) with an arbitrary text name.
 *
 * IMPORTANT
 * - POC only. No AST / Parser / Compiler / Registry behavior is changed.
 * - The target-owned Block/Item picker data is NOT treated as our Registry.
 * - Do not use browser-side injection while testing.
 */

namespace MCFunctionRegistrySearchProbe {

    /**
     * D: known-good Minecraft searchable block picker.
     */
    //% group="Native Field Probe"
    //% weight=97
    //% blockId=mcfunction_registry_probe_minecraft_block_baseline_v3
    //% block="PXT probe D minecraftBlock baseline $block"
    //% block.shadow=minecraftBlock
    export function minecraftBlockBaseline(block: number): number {
        return block;
    }

    /**
     * F: Minecraft target item shadow.
     * MakeCode's defining-blocks documentation names minecraftItem as the
     * blockId used by blocks.item(...). This probe checks the actual UI in
     * Minecraft Education / minecraft.makecode.com.
     */
    //% group="Native Field Probe"
    //% weight=96
    //% blockId=mcfunction_registry_probe_minecraft_item_native
    //% block="PXT probe F minecraftItem native $item"
    //% item.shadow=minecraftItem
    export function minecraftItemNative(item: number): number {
        return item;
    }

    /**
     * G: arbitrary code-name path exposed by the Minecraft target.
     * This is NOT our final Registry field. It only checks whether a name
     * absent from MakeCode's visual picker can still be represented by text.
     *
     * Test values from the current project Registry include:
     *   copper_spear
     *   copper_chest
     *   pale_oak_shelf
     *   resin_bricks
     */
    //% group="Native Field Probe"
    //% weight=95
    //% blockId=mcfunction_registry_probe_block_by_name_text
    //% block="PXT probe G blockByName text $name"
    //% name.defl="copper_spear"
    export function blockByNameText(name: string): number {
        return blocks.blockByName(name);
    }
}

/**
 * Separate namespace so the data-override experiment is visually isolated.
 * This uses a DOCUMENTED PXT field option name (`data`) forwarded through
 * shadowOptions. The question is whether the Minecraft target's own
 * minecraftBlock shadow consumes it.
 */
//% color="#8A6D3B" weight=4 icon="\uf002" block="MCFunction Data Override Probe"
namespace MCFunctionMinecraftDataOverrideProbe {
    /**
     * H: same target-owned minecraftBlock shadow, but tries to supply a tiny
     * custom label/value list through shadowOptions.data.
     *
     * If the target picker is externally data-driven, these MCF_TEST labels
     * should replace or materially change the native list. If the normal
     * Minecraft catalog remains unchanged, external data injection is ignored.
     */
    //% weight=100
    //% blockId=mcfunction_registry_probe_minecraft_block_data_override
    //% block="PXT probe H minecraftBlock custom data $block"
    //% block.shadow=minecraftBlock
    //% block.shadowOptions.data='[["MCF_TEST_ALPHA",1],["MCF_TEST_BETA",2],["MCF_TEST_GAMMA",3]]'
    export function minecraftBlockCustomData(block: number): number {
        return block;
    }
}
