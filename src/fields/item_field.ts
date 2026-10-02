/**
 * MakeCode Item value wrapper
 *
 * - 선택 블록: 자주 쓰는 Minecraft 아이템을 드롭다운으로 선택
 * - 직접 입력 블록: Custom Namespace / 아직 Registry에 없는 ID 입력
 *
 * 내부 타입은 둘 다 ItemValue이므로 give / clear / replaceitem /
 * hasitem 등 소비하는 쪽 코드는 동일하게 재사용한다.
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

    function itemPresetToken(
        preset: ItemPreset
    ): string {

        switch (preset) {

            case ItemPreset.Stone:
                return "minecraft:stone";

            case ItemPreset.Dirt:
                return "minecraft:dirt";

            case ItemPreset.Diamond:
                return "minecraft:diamond";

            case ItemPreset.Emerald:
                return "minecraft:emerald";

            case ItemPreset.IronIngot:
                return "minecraft:iron_ingot";

            case ItemPreset.GoldIngot:
                return "minecraft:gold_ingot";

            case ItemPreset.DiamondSword:
                return "minecraft:diamond_sword";

            case ItemPreset.DiamondPickaxe:
                return "minecraft:diamond_pickaxe";

            case ItemPreset.Bow:
                return "minecraft:bow";

            case ItemPreset.Arrow:
                return "minecraft:arrow";

            case ItemPreset.Apple:
                return "minecraft:apple";

            case ItemPreset.Bread:
                return "minecraft:bread";

            case ItemPreset.Paper:
                return "minecraft:paper";

            case ItemPreset.NameTag:
                return "minecraft:name_tag";

            case ItemPreset.Compass:
                return "minecraft:compass";

            case ItemPreset.Clock:
                return "minecraft:clock";

            case ItemPreset.Stick:
                return "minecraft:stick";

            case ItemPreset.Book:
                return "minecraft:book";

            default:
                return "minecraft:stone";
        }
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
}
