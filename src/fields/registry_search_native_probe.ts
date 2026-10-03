/**
 * Registry Search Native Field Probe
 *
 * PURPOSE
 * - Verify how Minecraft MakeCode / PXT reacts to an unknown fieldEditor
 *   selector from a normal GitHub Extension.
 * - Compare the result against a plain enum dropdown and the built-in
 *   gridpicker using the exact same enum values.
 *
 * IMPORTANT
 * - POC only. This is not part of the AST / Parser / Compiler / Registry core.
 * - Do not use browser-side injection while running this probe.
 * - Remove this file after the native field-editor capability is confirmed.
 */

//% color="#6A5ACD" weight=5 icon="\uf0ad" block="MCFunction PXT Probe"
//% groups='["Native Field Probe"]'
namespace MCFunctionRegistrySearchProbe {

    /**
     * Tiny fixed data set used only to isolate field-editor behavior.
     * Full Item / Block / Entity registries are intentionally NOT loaded here.
     */
    export enum RegistrySearchProbePreset {
        //% block="minecraft:diamond"
        Diamond = 0,

        //% block="minecraft:diamond_sword"
        DiamondSword = 1,

        //% block="minecraft:stone"
        Stone = 2,

        //% block="minecraft:oak_planks"
        OakPlanks = 3,

        //% block="minecraft:zombie"
        Zombie = 4,

        //% block="minecraft:armor_stand"
        ArmorStand = 5
    }

    /**
     * Baseline A: normal enum dropdown.
     * If this fails, the probe itself is not loading correctly.
     */
    //% group="Native Field Probe"
    //% weight=100
    //% blockId=mcfunction_registry_probe_plain_dropdown
    //% block="PXT probe A plain dropdown $preset"
    export function plainDropdown(
        preset: RegistrySearchProbePreset
    ): string {
        return probeToken(preset);
    }

    /**
     * Baseline B: built-in PXT gridpicker.
     * This should behave like the already-proven Entity 140 grid POC.
     */
    //% group="Native Field Probe"
    //% weight=99
    //% blockId=mcfunction_registry_probe_native_grid
    //% block="PXT probe B native grid $preset"
    //% preset.fieldEditor="gridpicker"
    //% preset.fieldOptions.columns=3
    export function nativeGrid(
        preset: RegistrySearchProbePreset
    ): string {
        return probeToken(preset);
    }

    /**
     * Experiment C: intentionally references a fieldEditor selector that is
     * NOT registered by the Minecraft target.
     *
     * The point is to observe the editor behavior:
     * - extension load error
     * - block render error
     * - fallback field
     * - ignored annotation
     * - explicit missing-field-editor message
     *
     * No custom JavaScript registration is injected here. If this selector
     * cannot be resolved by the target, that is the expected evidence that a
     * normal GitHub Extension cannot contribute this native field editor.
     */
    //% group="Native Field Probe"
    //% weight=98
    //% blockId=mcfunction_registry_probe_custom_field
    //% block="PXT probe C custom field $preset"
    //% preset.fieldEditor="mcfunction_registry_search"
    //% preset.fieldOptions.columns=3
    export function customField(
        preset: RegistrySearchProbePreset
    ): string {
        return probeToken(preset);
    }

    function probeToken(
        preset: RegistrySearchProbePreset
    ): string {
        switch (preset) {
            case RegistrySearchProbePreset.Diamond:
                return "minecraft:diamond";
            case RegistrySearchProbePreset.DiamondSword:
                return "minecraft:diamond_sword";
            case RegistrySearchProbePreset.Stone:
                return "minecraft:stone";
            case RegistrySearchProbePreset.OakPlanks:
                return "minecraft:oak_planks";
            case RegistrySearchProbePreset.Zombie:
                return "minecraft:zombie";
            case RegistrySearchProbePreset.ArmorStand:
                return "minecraft:armor_stand";
        }

        return "minecraft:diamond";
    }
}
