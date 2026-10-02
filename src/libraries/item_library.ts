/**
 * Item value library
 *
 * Visible MakeCode item/component blocks live here.
 * Core value types stay in MCFunctionFields.
 */

//% color="#C98900" weight=88 icon="\uf06b" block="MCFunction Item"
//% groups='["Selection & Input", "Item Components", "Registry"]'
namespace MCFunctionItemLibrary {

    //% group="Selection & Input"
    //% weight=100
    //% blockId=mcfunction_item_select
    //% block="item select $preset"
    export function select(
        preset: MCFunctionFields.ItemPreset
    ): MCFunctionFields.ItemValue {

        return MCFunctionFields.itemSelect(preset);
    }

    //% group="Selection & Input"
    //% weight=99
    //% blockId=mcfunction_item
    //% block="item custom id $itemId"
    //% itemId.defl="minecraft:stone"
    export function custom(
        itemId: string
    ): MCFunctionFields.ItemValue {

        return MCFunctionFields.item(itemId);
    }

    //% group="Item Components"
    //% weight=90
    //% blockId=mcfunction_item_components
    //% block="no item components"
    export function components(
    ): MCFunctionFields.ItemComponentsValue {

        return MCFunctionFields.itemComponents();
    }

    //% group="Item Components"
    //% weight=89
    //% blockId=mcfunction_item_component_can_destroy
    //% block="can destroy block $blockValue add then $components"
    //% components.shadow="mcfunction_item_components"
    //% blockValue.shadow="mcfunction_block_select"
    export function addCanDestroy(
        blockValue: MCFunctionFields.BlockValue,
        components: MCFunctionFields.ItemComponentsValue
    ): MCFunctionFields.ItemComponentsValue {

        return MCFunctionFields.addCanDestroy(
            components,
            blockValue
        );
    }

    //% group="Item Components"
    //% weight=88
    //% blockId=mcfunction_item_component_can_place_on
    //% block="can place on block $blockValue add then $components"
    //% components.shadow="mcfunction_item_components"
    //% blockValue.shadow="mcfunction_block_select"
    export function addCanPlaceOn(
        blockValue: MCFunctionFields.BlockValue,
        components: MCFunctionFields.ItemComponentsValue
    ): MCFunctionFields.ItemComponentsValue {

        return MCFunctionFields.addCanPlaceOn(
            components,
            blockValue
        );
    }

    //% group="Item Components"
    //% weight=87
    //% blockId=mcfunction_item_component_lock_inventory
    //% block="lock in inventory then $components"
    //% components.shadow="mcfunction_item_components"
    export function lockInInventory(
        components: MCFunctionFields.ItemComponentsValue
    ): MCFunctionFields.ItemComponentsValue {

        return MCFunctionFields.lockInInventory(components);
    }

    //% group="Item Components"
    //% weight=86
    //% blockId=mcfunction_item_component_lock_slot
    //% block="lock in slot then $components"
    //% components.shadow="mcfunction_item_components"
    export function lockInSlot(
        components: MCFunctionFields.ItemComponentsValue
    ): MCFunctionFields.ItemComponentsValue {

        return MCFunctionFields.lockInSlot(components);
    }

    //% group="Item Components"
    //% weight=85
    //% blockId=mcfunction_item_component_keep_on_death
    //% block="keep on death then $components"
    //% components.shadow="mcfunction_item_components"
    export function keepOnDeath(
        components: MCFunctionFields.ItemComponentsValue
    ): MCFunctionFields.ItemComponentsValue {

        return MCFunctionFields.keepOnDeath(components);
    }
}
