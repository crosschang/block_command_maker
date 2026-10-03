/**
 * Item image POC
 *
 * Purpose:
 * - Verify whether a target-native `minecraftItem` shadow is rendered with its
 *   item image inside MCFunction reporter blocks.
 * - Verify whether the same image is visible in MakeCode Toolbox Search.
 *
 * This is UI-only POC code. The icon parameter is intentionally ignored.
 * Command meaning remains the fixed Minecraft string returned as ItemValue.
 *
 * IMPORTANT:
 * - Do not use this as the final Registry implementation.
 * - Native minecraftItem data may lag behind current Bedrock/Education data.
 */

//% color="#C98900" weight=87 icon="\uf06b" block="MCFunction Item Image POC"
namespace MCFunctionItemVisualPOC {

    //% weight=100
    //% blockId=mcfunction_item_image_poc_diamond_sword
    //% block="visual item minecraft:diamond_sword $icon"
    //% icon.shadow=minecraftItem
    //% icon.defl=DIAMOND_SWORD
    export function diamondSword(icon: number): MCFunctionFields.ItemValue {
        return new MCFunctionFields.ItemValue("minecraft:diamond_sword");
    }

    //% weight=99
    //% blockId=mcfunction_item_image_poc_apple
    //% block="visual item minecraft:apple $icon"
    //% icon.shadow=minecraftItem
    //% icon.defl=APPLE
    export function apple(icon: number): MCFunctionFields.ItemValue {
        return new MCFunctionFields.ItemValue("minecraft:apple");
    }

    //% weight=98
    //% blockId=mcfunction_item_image_poc_stick
    //% block="visual item minecraft:stick $icon"
    //% icon.shadow=minecraftItem
    //% icon.defl=STICK
    export function stick(icon: number): MCFunctionFields.ItemValue {
        return new MCFunctionFields.ItemValue("minecraft:stick");
    }

    //% weight=97
    //% blockId=mcfunction_item_image_poc_bow
    //% block="visual item minecraft:bow $icon"
    //% icon.shadow=minecraftItem
    //% icon.defl=BOW
    export function bow(icon: number): MCFunctionFields.ItemValue {
        return new MCFunctionFields.ItemValue("minecraft:bow");
    }

    //% weight=96
    //% blockId=mcfunction_item_image_poc_arrow
    //% block="visual item minecraft:arrow $icon"
    //% icon.shadow=minecraftItem
    //% icon.defl=ARROW
    export function arrow(icon: number): MCFunctionFields.ItemValue {
        return new MCFunctionFields.ItemValue("minecraft:arrow");
    }

    //% weight=95
    //% blockId=mcfunction_item_image_poc_shield
    //% block="visual item minecraft:shield $icon"
    //% icon.shadow=minecraftItem
    //% icon.defl=SHIELD
    export function shield(icon: number): MCFunctionFields.ItemValue {
        return new MCFunctionFields.ItemValue("minecraft:shield");
    }

    //% weight=94
    //% blockId=mcfunction_item_image_poc_clock
    //% block="visual item minecraft:clock $icon"
    //% icon.shadow=minecraftItem
    //% icon.defl=CLOCK
    export function clock(icon: number): MCFunctionFields.ItemValue {
        return new MCFunctionFields.ItemValue("minecraft:clock");
    }

    //% weight=93
    //% blockId=mcfunction_item_image_poc_compass
    //% block="visual item minecraft:compass $icon"
    //% icon.shadow=minecraftItem
    //% icon.defl=COMPASS
    export function compass(icon: number): MCFunctionFields.ItemValue {
        return new MCFunctionFields.ItemValue("minecraft:compass");
    }

    //% weight=92
    //% blockId=mcfunction_item_image_poc_trident
    //% block="visual item minecraft:trident $icon"
    //% icon.shadow=minecraftItem
    //% icon.defl=TRIDENT
    export function trident(icon: number): MCFunctionFields.ItemValue {
        return new MCFunctionFields.ItemValue("minecraft:trident");
    }

    //% weight=91
    //% blockId=mcfunction_item_image_poc_diamond
    //% block="visual item minecraft:diamond $icon"
    //% icon.shadow=minecraftItem
    //% icon.defl=DIAMOND
    export function diamond(icon: number): MCFunctionFields.ItemValue {
        return new MCFunctionFields.ItemValue("minecraft:diamond");
    }
}
