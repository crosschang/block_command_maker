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
            case Stone.Stone:
                return "minecraft:stone";
            case Dirt.Dirt:
                return "minecraft:dirt";
            case Diamond.Diamond:
                return "minecraft:diamond";
            case Emerald.Emerald:
                return "minecraft:emerald";
            case IronIngot.IronIngot:
                return "minecraft:iron_ingot";
            case GoldIngot.GoldIngot:
                return "minecraft:gold_ingot";
            case DiamondSword.DiamondSword:
                return "minecraft:diamond_sword";
            case DiamondPickaxe.DiamondPickaxe:
                return "minecraft:diamond_pickaxe";
            case Bow.Bow:
                return "minecraft:bow";
            case Arrow.Arrow:
                return "minecraft:arrow";
            case Apple.Apple:
                return "minecraft:apple";
            case Bread.Bread:
                return "minecraft:bread";
            case Paper.Paper:
                return "minecraft:paper";
            case NameTag.NameTag:
                return "minecraft:name_tag";
            case Compass.Compass:
                return "minecraft:compass";
            case Clock.Clock:
                return "minecraft:clock";
            case Stick.Stick:
                return "minecraft:stick";
            case Book.Book:
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
            case Stone.Stone:
                return "minecraft:stone";
            case Dirt.Dirt:
                return "minecraft:dirt";
            case GrassBlock.GrassBlock:
                return "minecraft:grass_block";
            case Cobblestone.Cobblestone:
                return "minecraft:cobblestone";
            case OakPlanks.OakPlanks:
                return "minecraft:oak_planks";
            case Glass.Glass:
                return "minecraft:glass";
            case Bedrock.Bedrock:
                return "minecraft:bedrock";
            case DiamondBlock.DiamondBlock:
                return "minecraft:diamond_block";
            case GoldBlock.GoldBlock:
                return "minecraft:gold_block";
            case IronBlock.IronBlock:
                return "minecraft:iron_block";
            case RedstoneBlock.RedstoneBlock:
                return "minecraft:redstone_block";
            case Air.Air:
                return "minecraft:air";
            case Barrier.Barrier:
                return "minecraft:barrier";
            case Chest.Chest:
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
            case Player.Player:
                return "minecraft:player";
            case Zombie.Zombie:
                return "minecraft:zombie";
            case Skeleton.Skeleton:
                return "minecraft:skeleton";
            case Creeper.Creeper:
                return "minecraft:creeper";
            case ArmorStand.ArmorStand:
                return "minecraft:armor_stand";
            case Cow.Cow:
                return "minecraft:cow";
            case Pig.Pig:
                return "minecraft:pig";
            case Sheep.Sheep:
                return "minecraft:sheep";
            case Villager.Villager:
                return "minecraft:villager";
            case IronGolem.IronGolem:
                return "minecraft:iron_golem";
            case Item.Item:
                return "minecraft:item";
            case Arrow.Arrow:
                return "minecraft:arrow";
            default:
                return "minecraft:zombie";
        }
    }
}
