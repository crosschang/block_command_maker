/**
 * MakeCode Item value wrapper
 *
 * give, clear, replaceitem, hasitem 등에서 공통으로 사용할
 * 아이템 ID 입력용 값 블록.
 *
 * 현재는 직접 입력을 사용한다.
 * 이후 Item Registry 검색/자동완성 UI를 이 타입에 연결한다.
 * Custom Namespace ID도 그대로 허용한다.
 */

namespace MCFunctionFields {

    export class ItemValue {
        itemId: string;

        constructor(itemId: string) {
            this.itemId = itemId;
        }
    }

    //% group="아이템"
    //% blockId=mcfunction_item
    //% block="아이템 $itemId"
    //% itemId.defl="minecraft:stone"
    export function item(
        itemId: string
    ): ItemValue {

        return new ItemValue(
            itemId
        );
    }
}
