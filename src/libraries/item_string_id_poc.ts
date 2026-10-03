/**
 * Item ID string POC
 *
 * Purpose:
 * - Test a primitive string reporter as the value connected to a Give item input.
 * - Keep the existing ItemValue-based production blocks unchanged during the POC.
 *
 * If this POC passes in Minecraft Education, the generated full Item Registry can
 * later be migrated from ItemValue reporter blocks to string ID reporter blocks.
 */

namespace MCFunctionItemLibrary {

    //% group="Registry"
    //% weight=1000
    //% blockId=mcfunction_item_id_poc_diamond_sword
    //% block="item ID POC minecraft:diamond_sword"
    export function diamondSwordIdPoc(): string {
        return "minecraft:diamond_sword";
    }

    //% group="Registry"
    //% weight=999
    //% blockId=mcfunction_item_id_poc_copper_spear
    //% block="item ID POC minecraft:copper_spear"
    export function copperSpearIdPoc(): string {
        return "minecraft:copper_spear";
    }
}
