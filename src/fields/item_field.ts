/**
 * MakeCode Item value wrapper
 *
 * give, clear, replaceitem 등에서 공통으로 사용할
 * 아이템 입력용 값 블록.
 */

namespace MCFunctionFields {

    export class ItemValue {
        itemId: string;

        constructor(itemId: string) {
            this.itemId = itemId;
        }
    }

    //% blockId=mcfunction_item
    //% block="아이템 $itemId"
    //% itemId.defl="minecraft:stone"
    export function item(
        itemId: string
    ): ItemValue {
        return new ItemValue(itemId);
    }
}