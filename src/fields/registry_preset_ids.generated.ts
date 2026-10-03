/**
 * AUTO-GENERATED FILE. DO NOT EDIT BY HAND.
 *
 * Source: registry/source/presets.json
 * Generator: tools/generate_registry.ps1
 *
 * Quick Preset numeric value -> Minecraft ID mapping.
 * Kept separate from registry_presets.generated.ts so PXT sees that file as enum-only.
 */

namespace MCFunctionPresetIds {

    export function item(preset: number): string {

        switch (preset) {
            case 0:
                return "minecraft:stone";
            case 1:
                return "minecraft:dirt";
            case 2:
                return "minecraft:diamond";
            case 3:
                return "minecraft:emerald";
            case 4:
                return "minecraft:iron_ingot";
            case 5:
                return "minecraft:gold_ingot";
            case 6:
                return "minecraft:diamond_sword";
            case 7:
                return "minecraft:diamond_pickaxe";
            case 8:
                return "minecraft:bow";
            case 9:
                return "minecraft:arrow";
            case 10:
                return "minecraft:apple";
            case 11:
                return "minecraft:bread";
            case 12:
                return "minecraft:paper";
            case 13:
                return "minecraft:name_tag";
            case 14:
                return "minecraft:compass";
            case 15:
                return "minecraft:clock";
            case 16:
                return "minecraft:stick";
            case 17:
                return "minecraft:book";
            default:
                return "minecraft:stone";
        }
    }

    export function block(preset: number): string {

        switch (preset) {
            case 0:
                return "minecraft:stone";
            case 1:
                return "minecraft:dirt";
            case 2:
                return "minecraft:grass_block";
            case 3:
                return "minecraft:cobblestone";
            case 4:
                return "minecraft:oak_planks";
            case 5:
                return "minecraft:glass";
            case 6:
                return "minecraft:bedrock";
            case 7:
                return "minecraft:diamond_block";
            case 8:
                return "minecraft:gold_block";
            case 9:
                return "minecraft:iron_block";
            case 10:
                return "minecraft:redstone_block";
            case 11:
                return "minecraft:air";
            case 12:
                return "minecraft:barrier";
            case 13:
                return "minecraft:chest";
            default:
                return "minecraft:stone";
        }
    }

    export function entity(preset: number): string {

        switch (preset) {
            case 0:
                return "minecraft:player";
            case 1:
                return "minecraft:zombie";
            case 2:
                return "minecraft:skeleton";
            case 3:
                return "minecraft:creeper";
            case 4:
                return "minecraft:armor_stand";
            case 5:
                return "minecraft:cow";
            case 6:
                return "minecraft:pig";
            case 7:
                return "minecraft:sheep";
            case 8:
                return "minecraft:villager";
            case 9:
                return "minecraft:iron_golem";
            case 10:
                return "minecraft:item";
            case 11:
                return "minecraft:arrow";
            default:
                return "minecraft:zombie";
        }
    }
}
