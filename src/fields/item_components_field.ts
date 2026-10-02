/**
 * MakeCode Item Components value blocks
 *
 * give, replaceitem 등에서 공통 사용.
 */

namespace MCFunctionFields {

    export class ItemComponentsValue {

        components:
            MCFunctionAST.ItemCommandComponents;

        constructor(
            components:
                MCFunctionAST.ItemCommandComponents
        ) {
            this.components = components;
        }
    }

    //% group="아이템 상세"
    //% blockId=mcfunction_item_components
    //% block="아이템 컴포넌트"
    export function itemComponents(
    ): ItemComponentsValue {

        return new ItemComponentsValue(
            MCFunctionAST.createItemCommandComponents()
        );
    }

    //% group="아이템 상세"
    //% blockId=mcfunction_item_component_can_destroy
    //% block="컴포넌트 $components 캘 수 있는 블록 $blockName 추가"
    //% components.shadow="mcfunction_item_components"
    //% blockName.defl="minecraft:stone"
    export function addCanDestroy(
        components: ItemComponentsValue,
        blockName: string
    ): ItemComponentsValue {

        MCFunctionAST.addCanDestroyBlock(
            components.components,
            blockName
        );

        return components;
    }

    //% group="아이템 상세"
    //% blockId=mcfunction_item_component_can_place_on
    //% block="컴포넌트 $components 설치 가능한 블록 $blockName 추가"
    //% components.shadow="mcfunction_item_components"
    //% blockName.defl="minecraft:stone"
    export function addCanPlaceOn(
        components: ItemComponentsValue,
        blockName: string
    ): ItemComponentsValue {

        MCFunctionAST.addCanPlaceOnBlock(
            components.components,
            blockName
        );

        return components;
    }

    //% group="아이템 상세"
    //% blockId=mcfunction_item_component_lock_inventory
    //% block="컴포넌트 $components 인벤토리에 잠금"
    //% components.shadow="mcfunction_item_components"
    export function lockInInventory(
        components: ItemComponentsValue
    ): ItemComponentsValue {

        MCFunctionAST.setItemLock(
            components.components,
            MCFunctionAST.ItemLockMode.LockInInventory
        );

        return components;
    }

    //% group="아이템 상세"
    //% blockId=mcfunction_item_component_lock_slot
    //% block="컴포넌트 $components 슬롯에 잠금"
    //% components.shadow="mcfunction_item_components"
    export function lockInSlot(
        components: ItemComponentsValue
    ): ItemComponentsValue {

        MCFunctionAST.setItemLock(
            components.components,
            MCFunctionAST.ItemLockMode.LockInSlot
        );

        return components;
    }

    //% group="아이템 상세"
    //% blockId=mcfunction_item_component_keep_on_death
    //% block="컴포넌트 $components 사망 시 유지"
    //% components.shadow="mcfunction_item_components"
    export function keepOnDeath(
        components: ItemComponentsValue
    ): ItemComponentsValue {

        MCFunctionAST.setKeepOnDeath(
            components.components,
            true
        );

        return components;
    }
}