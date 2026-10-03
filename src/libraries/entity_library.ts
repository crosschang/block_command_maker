/**
 * Entity value library
 *
 * Visible MakeCode blocks live here.
 * Core value type stays MCFunctionFields.EntityValue.
 */

//% color="#2E8B57" weight=89 icon="\uf1b0" block="MCFunction Entity"
//% groups='["Selection & Input", "Registry"]'
namespace MCFunctionEntityLibrary {

    //% group="Selection & Input"
    //% weight=100
    //% blockId=mcfunction_entity_select
    //% block="entity select $preset"
    export function select(
        preset: MCFunctionFields.EntityPreset
    ): MCFunctionFields.EntityValue {

        return MCFunctionFields.entitySelect(preset);
    }

    //% group="Selection & Input"
    //% weight=99
    //% blockId=mcfunction_entity
    //% block="entity custom id $entityId"
    //% entityId.defl="minecraft:zombie"
    export function custom(
        entityId: string
    ): MCFunctionFields.EntityValue {

        return MCFunctionFields.entity(entityId);
    }


    // ---------------------------------------------------------------------
    // Searchable Grid Picker POC
    //
    // This uses MakeCode's native gridpicker for all 140 Entity Registry IDs.
    // A temporary browser-side POC injector adds a search box to large
    // Blockly dropdowns. AST / Compiler / Registry sources are unchanged.
    // Remove this section after the editor-side field implementation is proven.
    // ---------------------------------------------------------------------

    export enum EntitySearchGridPocPreset {

        //% block="minecraft:agent"
        Agent = 0,

        //% block="minecraft:allay"
        Allay = 1,

        //% block="minecraft:area_effect_cloud"
        AreaEffectCloud = 2,

        //% block="minecraft:armadillo"
        Armadillo = 3,

        //% block="minecraft:armor_stand"
        ArmorStand = 4,

        //% block="minecraft:arrow"
        Arrow = 5,

        //% block="minecraft:axolotl"
        Axolotl = 6,

        //% block="minecraft:balloon"
        Balloon = 7,

        //% block="minecraft:bat"
        Bat = 8,

        //% block="minecraft:bee"
        Bee = 9,

        //% block="minecraft:blaze"
        Blaze = 10,

        //% block="minecraft:boat"
        Boat = 11,

        //% block="minecraft:bogged"
        Bogged = 12,

        //% block="minecraft:breeze"
        Breeze = 13,

        //% block="minecraft:breeze_wind_charge_projectile"
        BreezeWindChargeProjectile = 14,

        //% block="minecraft:camel"
        Camel = 15,

        //% block="minecraft:camel_husk"
        CamelHusk = 16,

        //% block="minecraft:cat"
        Cat = 17,

        //% block="minecraft:cave_spider"
        CaveSpider = 18,

        //% block="minecraft:chalkboard"
        Chalkboard = 19,

        //% block="minecraft:chest_boat"
        ChestBoat = 20,

        //% block="minecraft:chest_minecart"
        ChestMinecart = 21,

        //% block="minecraft:chicken"
        Chicken = 22,

        //% block="minecraft:cod"
        Cod = 23,

        //% block="minecraft:command_block_minecart"
        CommandBlockMinecart = 24,

        //% block="minecraft:copper_golem"
        CopperGolem = 25,

        //% block="minecraft:cow"
        Cow = 26,

        //% block="minecraft:creaking"
        Creaking = 27,

        //% block="minecraft:creeper"
        Creeper = 28,

        //% block="minecraft:cushion"
        Cushion = 29,

        //% block="minecraft:dolphin"
        Dolphin = 30,

        //% block="minecraft:donkey"
        Donkey = 31,

        //% block="minecraft:dragon_fireball"
        DragonFireball = 32,

        //% block="minecraft:drowned"
        Drowned = 33,

        //% block="minecraft:egg"
        Egg = 34,

        //% block="minecraft:elder_guardian"
        ElderGuardian = 35,

        //% block="minecraft:elder_guardian_ghost"
        ElderGuardianGhost = 36,

        //% block="minecraft:ender_crystal"
        EnderCrystal = 37,

        //% block="minecraft:ender_dragon"
        EnderDragon = 38,

        //% block="minecraft:ender_pearl"
        EnderPearl = 39,

        //% block="minecraft:enderman"
        Enderman = 40,

        //% block="minecraft:endermite"
        Endermite = 41,

        //% block="minecraft:evocation_fang"
        EvocationFang = 42,

        //% block="minecraft:evocation_illager"
        EvocationIllager = 43,

        //% block="minecraft:eye_of_ender_signal"
        EyeOfEnderSignal = 44,

        //% block="minecraft:falling_block"
        FallingBlock = 45,

        //% block="minecraft:fireball"
        Fireball = 46,

        //% block="minecraft:fireworks_rocket"
        FireworksRocket = 47,

        //% block="minecraft:fishing_hook"
        FishingHook = 48,

        //% block="minecraft:fox"
        Fox = 49,

        //% block="minecraft:frog"
        Frog = 50,

        //% block="minecraft:ghast"
        Ghast = 51,

        //% block="minecraft:glow_squid"
        GlowSquid = 52,

        //% block="minecraft:goat"
        Goat = 53,

        //% block="minecraft:guardian"
        Guardian = 54,

        //% block="minecraft:happy_ghast"
        HappyGhast = 55,

        //% block="minecraft:hoglin"
        Hoglin = 56,

        //% block="minecraft:hopper_minecart"
        HopperMinecart = 57,

        //% block="minecraft:horse"
        Horse = 58,

        //% block="minecraft:husk"
        Husk = 59,

        //% block="minecraft:ice_bomb"
        IceBomb = 60,

        //% block="minecraft:iron_golem"
        IronGolem = 61,

        //% block="minecraft:item"
        Item = 62,

        //% block="minecraft:leash_knot"
        LeashKnot = 63,

        //% block="minecraft:lightning_bolt"
        LightningBolt = 64,

        //% block="minecraft:lingering_potion"
        LingeringPotion = 65,

        //% block="minecraft:llama"
        Llama = 66,

        //% block="minecraft:llama_spit"
        LlamaSpit = 67,

        //% block="minecraft:magma_cube"
        MagmaCube = 68,

        //% block="minecraft:minecart"
        Minecart = 69,

        //% block="minecraft:mooshroom"
        Mooshroom = 70,

        //% block="minecraft:moving_block"
        MovingBlock = 71,

        //% block="minecraft:mule"
        Mule = 72,

        //% block="minecraft:nautilus"
        Nautilus = 73,

        //% block="minecraft:npc"
        Npc = 74,

        //% block="minecraft:ocelot"
        Ocelot = 75,

        //% block="minecraft:ominous_item_spawner"
        OminousItemSpawner = 76,

        //% block="minecraft:painting"
        Painting = 77,

        //% block="minecraft:panda"
        Panda = 78,

        //% block="minecraft:parched"
        Parched = 79,

        //% block="minecraft:parrot"
        Parrot = 80,

        //% block="minecraft:phantom"
        Phantom = 81,

        //% block="minecraft:pig"
        Pig = 82,

        //% block="minecraft:piglin"
        Piglin = 83,

        //% block="minecraft:piglin_brute"
        PiglinBrute = 84,

        //% block="minecraft:pillager"
        Pillager = 85,

        //% block="minecraft:player"
        Player = 86,

        //% block="minecraft:polar_bear"
        PolarBear = 87,

        //% block="minecraft:pufferfish"
        Pufferfish = 88,

        //% block="minecraft:rabbit"
        Rabbit = 89,

        //% block="minecraft:ravager"
        Ravager = 90,

        //% block="minecraft:salmon"
        Salmon = 91,

        //% block="minecraft:sheep"
        Sheep = 92,

        //% block="minecraft:shield"
        Shield = 93,

        //% block="minecraft:shulker"
        Shulker = 94,

        //% block="minecraft:shulker_bullet"
        ShulkerBullet = 95,

        //% block="minecraft:silverfish"
        Silverfish = 96,

        //% block="minecraft:skeleton"
        Skeleton = 97,

        //% block="minecraft:skeleton_horse"
        SkeletonHorse = 98,

        //% block="minecraft:slime"
        Slime = 99,

        //% block="minecraft:small_fireball"
        SmallFireball = 100,

        //% block="minecraft:sniffer"
        Sniffer = 101,

        //% block="minecraft:snow_golem"
        SnowGolem = 102,

        //% block="minecraft:snowball"
        Snowball = 103,

        //% block="minecraft:spider"
        Spider = 104,

        //% block="minecraft:splash_potion"
        SplashPotion = 105,

        //% block="minecraft:squid"
        Squid = 106,

        //% block="minecraft:stray"
        Stray = 107,

        //% block="minecraft:strider"
        Strider = 108,

        //% block="minecraft:sulfur_cube"
        SulfurCube = 109,

        //% block="minecraft:tadpole"
        Tadpole = 110,

        //% block="minecraft:thrown_trident"
        ThrownTrident = 111,

        //% block="minecraft:tnt"
        Tnt = 112,

        //% block="minecraft:tnt_minecart"
        TntMinecart = 113,

        //% block="minecraft:trader_llama"
        TraderLlama = 114,

        //% block="minecraft:tripod_camera"
        TripodCamera = 115,

        //% block="minecraft:tropicalfish"
        Tropicalfish = 116,

        //% block="minecraft:turtle"
        Turtle = 117,

        //% block="minecraft:vex"
        Vex = 118,

        //% block="minecraft:villager"
        Villager = 119,

        //% block="minecraft:villager_v2"
        VillagerV2 = 120,

        //% block="minecraft:vindicator"
        Vindicator = 121,

        //% block="minecraft:wandering_trader"
        WanderingTrader = 122,

        //% block="minecraft:warden"
        Warden = 123,

        //% block="minecraft:wind_charge_projectile"
        WindChargeProjectile = 124,

        //% block="minecraft:witch"
        Witch = 125,

        //% block="minecraft:wither"
        Wither = 126,

        //% block="minecraft:wither_skeleton"
        WitherSkeleton = 127,

        //% block="minecraft:wither_skull"
        WitherSkull = 128,

        //% block="minecraft:wither_skull_dangerous"
        WitherSkullDangerous = 129,

        //% block="minecraft:wolf"
        Wolf = 130,

        //% block="minecraft:xp_bottle"
        XpBottle = 131,

        //% block="minecraft:xp_orb"
        XpOrb = 132,

        //% block="minecraft:zoglin"
        Zoglin = 133,

        //% block="minecraft:zombie"
        Zombie = 134,

        //% block="minecraft:zombie_horse"
        ZombieHorse = 135,

        //% block="minecraft:zombie_nautilus"
        ZombieNautilus = 136,

        //% block="minecraft:zombie_pigman"
        ZombiePigman = 137,

        //% block="minecraft:zombie_villager"
        ZombieVillager = 138,

        //% block="minecraft:zombie_villager_v2"
        ZombieVillagerV2 = 139
    }

    //% group="Selection & Input"
    //% weight=98
    //% blockId=mcfunction_entity_search_grid_poc
    //% block="entity searchable grid $preset"
    //% preset.fieldEditor="gridpicker"
    //% preset.fieldOptions.columns=5
    export function searchableGridPoc(
        preset: EntitySearchGridPocPreset
    ): MCFunctionFields.EntityValue {

        return MCFunctionFields.entity(
            entitySearchGridPocId(preset)
        );
    }

    function entitySearchGridPocId(
        preset: EntitySearchGridPocPreset
    ): string {

        switch (preset) {

            case EntitySearchGridPocPreset.Agent:
                return "minecraft:agent";

            case EntitySearchGridPocPreset.Allay:
                return "minecraft:allay";

            case EntitySearchGridPocPreset.AreaEffectCloud:
                return "minecraft:area_effect_cloud";

            case EntitySearchGridPocPreset.Armadillo:
                return "minecraft:armadillo";

            case EntitySearchGridPocPreset.ArmorStand:
                return "minecraft:armor_stand";

            case EntitySearchGridPocPreset.Arrow:
                return "minecraft:arrow";

            case EntitySearchGridPocPreset.Axolotl:
                return "minecraft:axolotl";

            case EntitySearchGridPocPreset.Balloon:
                return "minecraft:balloon";

            case EntitySearchGridPocPreset.Bat:
                return "minecraft:bat";

            case EntitySearchGridPocPreset.Bee:
                return "minecraft:bee";

            case EntitySearchGridPocPreset.Blaze:
                return "minecraft:blaze";

            case EntitySearchGridPocPreset.Boat:
                return "minecraft:boat";

            case EntitySearchGridPocPreset.Bogged:
                return "minecraft:bogged";

            case EntitySearchGridPocPreset.Breeze:
                return "minecraft:breeze";

            case EntitySearchGridPocPreset.BreezeWindChargeProjectile:
                return "minecraft:breeze_wind_charge_projectile";

            case EntitySearchGridPocPreset.Camel:
                return "minecraft:camel";

            case EntitySearchGridPocPreset.CamelHusk:
                return "minecraft:camel_husk";

            case EntitySearchGridPocPreset.Cat:
                return "minecraft:cat";

            case EntitySearchGridPocPreset.CaveSpider:
                return "minecraft:cave_spider";

            case EntitySearchGridPocPreset.Chalkboard:
                return "minecraft:chalkboard";

            case EntitySearchGridPocPreset.ChestBoat:
                return "minecraft:chest_boat";

            case EntitySearchGridPocPreset.ChestMinecart:
                return "minecraft:chest_minecart";

            case EntitySearchGridPocPreset.Chicken:
                return "minecraft:chicken";

            case EntitySearchGridPocPreset.Cod:
                return "minecraft:cod";

            case EntitySearchGridPocPreset.CommandBlockMinecart:
                return "minecraft:command_block_minecart";

            case EntitySearchGridPocPreset.CopperGolem:
                return "minecraft:copper_golem";

            case EntitySearchGridPocPreset.Cow:
                return "minecraft:cow";

            case EntitySearchGridPocPreset.Creaking:
                return "minecraft:creaking";

            case EntitySearchGridPocPreset.Creeper:
                return "minecraft:creeper";

            case EntitySearchGridPocPreset.Cushion:
                return "minecraft:cushion";

            case EntitySearchGridPocPreset.Dolphin:
                return "minecraft:dolphin";

            case EntitySearchGridPocPreset.Donkey:
                return "minecraft:donkey";

            case EntitySearchGridPocPreset.DragonFireball:
                return "minecraft:dragon_fireball";

            case EntitySearchGridPocPreset.Drowned:
                return "minecraft:drowned";

            case EntitySearchGridPocPreset.Egg:
                return "minecraft:egg";

            case EntitySearchGridPocPreset.ElderGuardian:
                return "minecraft:elder_guardian";

            case EntitySearchGridPocPreset.ElderGuardianGhost:
                return "minecraft:elder_guardian_ghost";

            case EntitySearchGridPocPreset.EnderCrystal:
                return "minecraft:ender_crystal";

            case EntitySearchGridPocPreset.EnderDragon:
                return "minecraft:ender_dragon";

            case EntitySearchGridPocPreset.EnderPearl:
                return "minecraft:ender_pearl";

            case EntitySearchGridPocPreset.Enderman:
                return "minecraft:enderman";

            case EntitySearchGridPocPreset.Endermite:
                return "minecraft:endermite";

            case EntitySearchGridPocPreset.EvocationFang:
                return "minecraft:evocation_fang";

            case EntitySearchGridPocPreset.EvocationIllager:
                return "minecraft:evocation_illager";

            case EntitySearchGridPocPreset.EyeOfEnderSignal:
                return "minecraft:eye_of_ender_signal";

            case EntitySearchGridPocPreset.FallingBlock:
                return "minecraft:falling_block";

            case EntitySearchGridPocPreset.Fireball:
                return "minecraft:fireball";

            case EntitySearchGridPocPreset.FireworksRocket:
                return "minecraft:fireworks_rocket";

            case EntitySearchGridPocPreset.FishingHook:
                return "minecraft:fishing_hook";

            case EntitySearchGridPocPreset.Fox:
                return "minecraft:fox";

            case EntitySearchGridPocPreset.Frog:
                return "minecraft:frog";

            case EntitySearchGridPocPreset.Ghast:
                return "minecraft:ghast";

            case EntitySearchGridPocPreset.GlowSquid:
                return "minecraft:glow_squid";

            case EntitySearchGridPocPreset.Goat:
                return "minecraft:goat";

            case EntitySearchGridPocPreset.Guardian:
                return "minecraft:guardian";

            case EntitySearchGridPocPreset.HappyGhast:
                return "minecraft:happy_ghast";

            case EntitySearchGridPocPreset.Hoglin:
                return "minecraft:hoglin";

            case EntitySearchGridPocPreset.HopperMinecart:
                return "minecraft:hopper_minecart";

            case EntitySearchGridPocPreset.Horse:
                return "minecraft:horse";

            case EntitySearchGridPocPreset.Husk:
                return "minecraft:husk";

            case EntitySearchGridPocPreset.IceBomb:
                return "minecraft:ice_bomb";

            case EntitySearchGridPocPreset.IronGolem:
                return "minecraft:iron_golem";

            case EntitySearchGridPocPreset.Item:
                return "minecraft:item";

            case EntitySearchGridPocPreset.LeashKnot:
                return "minecraft:leash_knot";

            case EntitySearchGridPocPreset.LightningBolt:
                return "minecraft:lightning_bolt";

            case EntitySearchGridPocPreset.LingeringPotion:
                return "minecraft:lingering_potion";

            case EntitySearchGridPocPreset.Llama:
                return "minecraft:llama";

            case EntitySearchGridPocPreset.LlamaSpit:
                return "minecraft:llama_spit";

            case EntitySearchGridPocPreset.MagmaCube:
                return "minecraft:magma_cube";

            case EntitySearchGridPocPreset.Minecart:
                return "minecraft:minecart";

            case EntitySearchGridPocPreset.Mooshroom:
                return "minecraft:mooshroom";

            case EntitySearchGridPocPreset.MovingBlock:
                return "minecraft:moving_block";

            case EntitySearchGridPocPreset.Mule:
                return "minecraft:mule";

            case EntitySearchGridPocPreset.Nautilus:
                return "minecraft:nautilus";

            case EntitySearchGridPocPreset.Npc:
                return "minecraft:npc";

            case EntitySearchGridPocPreset.Ocelot:
                return "minecraft:ocelot";

            case EntitySearchGridPocPreset.OminousItemSpawner:
                return "minecraft:ominous_item_spawner";

            case EntitySearchGridPocPreset.Painting:
                return "minecraft:painting";

            case EntitySearchGridPocPreset.Panda:
                return "minecraft:panda";

            case EntitySearchGridPocPreset.Parched:
                return "minecraft:parched";

            case EntitySearchGridPocPreset.Parrot:
                return "minecraft:parrot";

            case EntitySearchGridPocPreset.Phantom:
                return "minecraft:phantom";

            case EntitySearchGridPocPreset.Pig:
                return "minecraft:pig";

            case EntitySearchGridPocPreset.Piglin:
                return "minecraft:piglin";

            case EntitySearchGridPocPreset.PiglinBrute:
                return "minecraft:piglin_brute";

            case EntitySearchGridPocPreset.Pillager:
                return "minecraft:pillager";

            case EntitySearchGridPocPreset.Player:
                return "minecraft:player";

            case EntitySearchGridPocPreset.PolarBear:
                return "minecraft:polar_bear";

            case EntitySearchGridPocPreset.Pufferfish:
                return "minecraft:pufferfish";

            case EntitySearchGridPocPreset.Rabbit:
                return "minecraft:rabbit";

            case EntitySearchGridPocPreset.Ravager:
                return "minecraft:ravager";

            case EntitySearchGridPocPreset.Salmon:
                return "minecraft:salmon";

            case EntitySearchGridPocPreset.Sheep:
                return "minecraft:sheep";

            case EntitySearchGridPocPreset.Shield:
                return "minecraft:shield";

            case EntitySearchGridPocPreset.Shulker:
                return "minecraft:shulker";

            case EntitySearchGridPocPreset.ShulkerBullet:
                return "minecraft:shulker_bullet";

            case EntitySearchGridPocPreset.Silverfish:
                return "minecraft:silverfish";

            case EntitySearchGridPocPreset.Skeleton:
                return "minecraft:skeleton";

            case EntitySearchGridPocPreset.SkeletonHorse:
                return "minecraft:skeleton_horse";

            case EntitySearchGridPocPreset.Slime:
                return "minecraft:slime";

            case EntitySearchGridPocPreset.SmallFireball:
                return "minecraft:small_fireball";

            case EntitySearchGridPocPreset.Sniffer:
                return "minecraft:sniffer";

            case EntitySearchGridPocPreset.SnowGolem:
                return "minecraft:snow_golem";

            case EntitySearchGridPocPreset.Snowball:
                return "minecraft:snowball";

            case EntitySearchGridPocPreset.Spider:
                return "minecraft:spider";

            case EntitySearchGridPocPreset.SplashPotion:
                return "minecraft:splash_potion";

            case EntitySearchGridPocPreset.Squid:
                return "minecraft:squid";

            case EntitySearchGridPocPreset.Stray:
                return "minecraft:stray";

            case EntitySearchGridPocPreset.Strider:
                return "minecraft:strider";

            case EntitySearchGridPocPreset.SulfurCube:
                return "minecraft:sulfur_cube";

            case EntitySearchGridPocPreset.Tadpole:
                return "minecraft:tadpole";

            case EntitySearchGridPocPreset.ThrownTrident:
                return "minecraft:thrown_trident";

            case EntitySearchGridPocPreset.Tnt:
                return "minecraft:tnt";

            case EntitySearchGridPocPreset.TntMinecart:
                return "minecraft:tnt_minecart";

            case EntitySearchGridPocPreset.TraderLlama:
                return "minecraft:trader_llama";

            case EntitySearchGridPocPreset.TripodCamera:
                return "minecraft:tripod_camera";

            case EntitySearchGridPocPreset.Tropicalfish:
                return "minecraft:tropicalfish";

            case EntitySearchGridPocPreset.Turtle:
                return "minecraft:turtle";

            case EntitySearchGridPocPreset.Vex:
                return "minecraft:vex";

            case EntitySearchGridPocPreset.Villager:
                return "minecraft:villager";

            case EntitySearchGridPocPreset.VillagerV2:
                return "minecraft:villager_v2";

            case EntitySearchGridPocPreset.Vindicator:
                return "minecraft:vindicator";

            case EntitySearchGridPocPreset.WanderingTrader:
                return "minecraft:wandering_trader";

            case EntitySearchGridPocPreset.Warden:
                return "minecraft:warden";

            case EntitySearchGridPocPreset.WindChargeProjectile:
                return "minecraft:wind_charge_projectile";

            case EntitySearchGridPocPreset.Witch:
                return "minecraft:witch";

            case EntitySearchGridPocPreset.Wither:
                return "minecraft:wither";

            case EntitySearchGridPocPreset.WitherSkeleton:
                return "minecraft:wither_skeleton";

            case EntitySearchGridPocPreset.WitherSkull:
                return "minecraft:wither_skull";

            case EntitySearchGridPocPreset.WitherSkullDangerous:
                return "minecraft:wither_skull_dangerous";

            case EntitySearchGridPocPreset.Wolf:
                return "minecraft:wolf";

            case EntitySearchGridPocPreset.XpBottle:
                return "minecraft:xp_bottle";

            case EntitySearchGridPocPreset.XpOrb:
                return "minecraft:xp_orb";

            case EntitySearchGridPocPreset.Zoglin:
                return "minecraft:zoglin";

            case EntitySearchGridPocPreset.Zombie:
                return "minecraft:zombie";

            case EntitySearchGridPocPreset.ZombieHorse:
                return "minecraft:zombie_horse";

            case EntitySearchGridPocPreset.ZombieNautilus:
                return "minecraft:zombie_nautilus";

            case EntitySearchGridPocPreset.ZombiePigman:
                return "minecraft:zombie_pigman";

            case EntitySearchGridPocPreset.ZombieVillager:
                return "minecraft:zombie_villager";

            case EntitySearchGridPocPreset.ZombieVillagerV2:
                return "minecraft:zombie_villager_v2";

            default:
                return "minecraft:zombie";
        }
    }
}
