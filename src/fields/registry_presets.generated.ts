/**
 * AUTO-GENERATED FILE. DO NOT EDIT BY HAND.
 *
 * Source:
 * - registry/source/presets.json
 *
 * Full Registry data is intentionally NOT used for this dropdown.
 * The complete values live in the Entity / Item / Block libraries.
 *
 * Generator:
 * - tools/generate_registry.ps1
 *
 * MakeCode enum dropdowns must exist at compile time, so this generated
 * TypeScript file is committed to Git and included by pxt.json.
 */

namespace MCFunctionFields {

    export enum ItemPreset {
        //% block="minecraft:stone"
        Stone = 0,

        //% block="minecraft:dirt"
        Dirt = 1,

        //% block="minecraft:diamond"
        Diamond = 2,

        //% block="minecraft:emerald"
        Emerald = 3,

        //% block="minecraft:iron_ingot"
        IronIngot = 4,

        //% block="minecraft:gold_ingot"
        GoldIngot = 5,

        //% block="minecraft:diamond_sword"
        DiamondSword = 6,

        //% block="minecraft:diamond_pickaxe"
        DiamondPickaxe = 7,

        //% block="minecraft:bow"
        Bow = 8,

        //% block="minecraft:arrow"
        Arrow = 9,

        //% block="minecraft:apple"
        Apple = 10,

        //% block="minecraft:bread"
        Bread = 11,

        //% block="minecraft:paper"
        Paper = 12,

        //% block="minecraft:name_tag"
        NameTag = 13,

        //% block="minecraft:compass"
        Compass = 14,

        //% block="minecraft:clock"
        Clock = 15,

        //% block="minecraft:stick"
        Stick = 16,

        //% block="minecraft:book"
        Book = 17
    }

    export function itemPresetId(
        preset: ItemPreset
    ): string {

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

    export function blockPresetId(
        preset: BlockPreset
    ): string {

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

    export function entityPresetId(
        preset: EntityPreset
    ): string {

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
