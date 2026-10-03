/**
 * PXT built-in dropdown capability probe
 *
 * PURPOSE
 * - I: verify the documented `numberdropdown` field editor with a small
 *   extension-owned data set.
 * - J: verify whether the same documented field editor changes behavior
 *   (for example, adds search/filter UI) when the extension supplies a
 *   large registry-like data set.
 *
 * IMPORTANT
 * - POC only. No AST / Parser / Compiler / Registry behavior is changed.
 * - All labels come from the extension, not from Minecraft's target picker.
 * - This uses only the documented PXT `numberdropdown` + `fieldOptions.data`
 *   path; no guessed field-editor selector is used.
 */

//% color="#5B6EAE" weight=3 icon="\uf0ca" block="MCFunction Builtin Field Probe"
namespace MCFunctionBuiltinFieldProbe {

    /** Hidden shadow used by probe I. */
    //% blockId=mcfunction_builtin_probe_numberdropdown_small_shadow
    //% block="$value"
    //% blockHidden=true
    //% value.fieldEditor="numberdropdown"
    //% value.fieldOptions.decompileLiterals=true
    //% value.fieldOptions.data='[["minecraft:stone",0],["minecraft:diamond",1],["minecraft:diamond_sword",2],["minecraft:oak_planks",3],["minecraft:pale_oak_shelf",4],["minecraft:resin_bricks",5],["minecraft:copper_spear",6],["minecraft:waxed_weathered_copper_chest",7],["minecraft:firefly_bush",8],["minecraft:cactus_flower",9],["minecraft:golden_dandelion",10],["minecraft:polished_sulfur",11]]'
    export function __numberDropdownSmall(value: number): number {
        return value;
    }

    /**
     * I: documented numberdropdown with 12 extension-owned Minecraft IDs.
     */
    //% weight=100
    //% blockId=mcfunction_builtin_probe_numberdropdown_small
    //% block="PXT probe I numberdropdown 12 $value"
    //% value.shadow=mcfunction_builtin_probe_numberdropdown_small_shadow
    export function numberDropdownSmall(value: number): number {
        return value;
    }

    /** Hidden shadow used by probe J. */
    //% blockId=mcfunction_builtin_probe_numberdropdown_large_shadow
    //% block="$value"
    //% blockHidden=true
    //% value.fieldEditor="numberdropdown"
    //% value.fieldOptions.decompileLiterals=true
    //% value.fieldOptions.data='[["minecraft:cyan_terracotta",0],["minecraft:blue_candle",1],["minecraft:dark_oak_wood",2],["minecraft:polished_basalt",3],["minecraft:nether_gold_ore",4],["minecraft:zombie_head",5],["minecraft:waxed_weathered_copper_chain",6],["minecraft:leaf_litter",7],["minecraft:warped_door",8],["minecraft:light_blue_concrete_powder",9],["minecraft:bamboo_block",10],["minecraft:waxed_oxidized_chiseled_copper",11],["minecraft:wet_sponge",12],["minecraft:end_stone_brick_wall",13],["minecraft:granite",14],["minecraft:blue_stained_glass_pane",15],["minecraft:fence_gate",16],["minecraft:birch_shelf",17],["minecraft:dark_oak_button",18],["minecraft:deepslate_copper_ore",19],["minecraft:chiseled_stone_bricks",20],["minecraft:nether_brick_stairs",21],["minecraft:yellow_shulker_box",22],["minecraft:lime_stained_glass",23],["minecraft:red_wool",24],["minecraft:jungle_button",25],["minecraft:spruce_stairs",26],["minecraft:acacia_shelf",27],["minecraft:diorite",28],["minecraft:pale_oak_fence_gate",29],["minecraft:polished_tuff_slab",30],["minecraft:cherry_pressure_plate",31],["minecraft:cherry_hanging_sign",32],["minecraft:yellow_wool",33],["minecraft:yellow_stained_glass_pane",34],["minecraft:azure_bluet",35],["minecraft:beacon",36],["minecraft:red_nether_brick",37],["minecraft:brick_wall",38],["minecraft:polished_sulfur",39],["minecraft:cobbled_deepslate_stairs",40],["minecraft:smooth_sandstone",41],["minecraft:snow_layer",42],["minecraft:black_candle",43],["minecraft:blue_carpet",44],["minecraft:glow_frame",45],["minecraft:hanging_roots",46],["minecraft:red_sandstone_wall",47],["minecraft:prismarine_bricks_stairs",48],["minecraft:waxed_oxidized_cut_copper",49],["minecraft:waxed_exposed_copper_chain",50],["minecraft:waxed_exposed_copper_chest",51],["minecraft:calcite",52],["minecraft:diorite_slab",53],["minecraft:stripped_dark_oak_log",54],["minecraft:dead_bubble_coral_fan",55],["minecraft:jungle_log",56],["minecraft:bubble_coral_fan",57],["minecraft:sculk_shrieker",58],["minecraft:gray_wool",59],["minecraft:orange_stained_glass_pane",60],["minecraft:gray_carpet",61],["minecraft:lily_of_the_valley",62],["minecraft:lime_glazed_terracotta",63],["minecraft:trapdoor",64],["minecraft:cactus_flower",65],["minecraft:dead_brain_coral_fan",66],["minecraft:seagrass",67],["minecraft:tube_coral_fan",68],["minecraft:waxed_exposed_cut_copper_slab",69],["minecraft:redstone_lamp",70],["minecraft:mossy_cobblestone",71],["minecraft:deepslate",72],["minecraft:magenta_carpet",73],["minecraft:brown_wool",74],["minecraft:waxed_exposed_chiseled_copper",75],["minecraft:tuff_slab",76],["minecraft:cinnabar_wall",77],["minecraft:warped_pressure_plate",78],["minecraft:stripped_acacia_wood",79],["minecraft:firefly_bush",80],["minecraft:diamond_block",81],["minecraft:oak_stairs",82],["minecraft:oak_log",83],["minecraft:brown_stained_glass_pane",84],["minecraft:sulfur_spike",85],["minecraft:end_bricks",86],["minecraft:magenta_shulker_box",87],["minecraft:packed_ice",88],["minecraft:packed_mud",89],["minecraft:moss_carpet",90],["minecraft:warped_fungus",91],["minecraft:oxidized_lightning_rod",92],["minecraft:polished_deepslate_slab",93],["minecraft:bamboo_door",94],["minecraft:amethyst_block",95],["minecraft:gold_block",96],["minecraft:flower_pot",97],["minecraft:chiseled_bookshelf",98],["minecraft:polished_deepslate_stairs",99],["minecraft:lime_shulker_box",100],["minecraft:weathered_chiseled_copper",101],["minecraft:small_amethyst_bud",102],["minecraft:golden_dandelion",103],["minecraft:activator_rail",104],["minecraft:iron_trapdoor",105],["minecraft:muddy_mangrove_roots",106],["minecraft:pale_oak_pressure_plate",107],["minecraft:stripped_jungle_wood",108],["minecraft:noteblock",109],["minecraft:tuff",110],["minecraft:mangrove_log",111],["minecraft:oxidized_cut_copper_stairs",112],["minecraft:pale_oak_fence",113],["minecraft:pale_oak_leaves",114],["minecraft:sandstone_slab",115],["minecraft:pale_oak_shelf",116],["minecraft:resin_bricks",117],["minecraft:copper_spear",118],["minecraft:waxed_weathered_copper_chest",119]]'
    export function __numberDropdownLarge(value: number): number {
        return value;
    }

    /**
     * J: same documented field editor with 120 extension-owned Registry IDs.
     * Check whether PXT automatically adds search/filter UI for a large list.
     */
    //% weight=99
    //% blockId=mcfunction_builtin_probe_numberdropdown_large
    //% block="PXT probe J numberdropdown 120 $value"
    //% value.shadow=mcfunction_builtin_probe_numberdropdown_large_shadow
    export function numberDropdownLarge(value: number): number {
        return value;
    }
}
