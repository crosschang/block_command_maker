/**
 * MakeCode Item value wrapper
 *
 * Registry 연결 버전.
 *
 * 중요:
 * - ItemPreset의 순서는 registry/bedrock/items.ts의 itemIds() 순서와 같아야 한다.
 * - 실제 Minecraft ID의 Source of Truth는 Registry다.
 * - 직접 입력은 Custom Namespace를 위해 계속 허용한다.
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

    export class ItemValue {
        itemId: string;

        constructor(itemId: string) {
            this.itemId = itemId;
        }
    }

    /**
     * Preset enum -> Registry ID
     *
     * switch에 Minecraft ID를 중복 저장하지 않는다.
     * Registry 배열이 실제 ID Source of Truth다.
     */
    function itemPresetToken(
        preset: ItemPreset
    ): string {

        let ids =
            MCFunctionRegistryBedrock.itemIds();

        let index = preset;

        if (
            index >= 0 &&
            index < ids.length
        ) {
            return ids[index];
        }

        return "minecraft:stone";
    }

    //% group="아이템"
    //% blockId=mcfunction_item_select
    //% block="아이템 선택 $preset"
    export function itemSelect(
        preset: ItemPreset
    ): ItemValue {

        return new ItemValue(
            itemPresetToken(preset)
        );
    }

    // 기존 blockId는 직접 입력용으로 유지한다.
    // Registry에 없는 Custom Namespace도 허용한다.
    //% group="아이템"
    //% blockId=mcfunction_item
    //% block="아이템 직접 입력 $itemId"
    //% itemId.defl="minecraft:stone"
    export function item(
        itemId: string
    ): ItemValue {

        return new ItemValue(
            itemId
        );
    }

    /**
     * 이후 검색 Field에서 그대로 사용할 Registry API.
     * 블록으로 노출하지 않는다.
     */
    export function searchItemRegistry(
        query: string,
        limit: number
    ): string[] {

        return MCFunctionRegistryBedrock.searchItems(
            query,
            limit
        );
    }

    export function isKnownItemId(
        itemId: string
    ): boolean {

        return MCFunctionRegistryBedrock.isKnownItem(
            itemId
        );
    }
}
