/**
 * MakeCode Block value wrapper
 *
 * setblock, fill, can_destroy, can_place_on 등에서
 * 공통으로 사용할 블록 ID 입력용 값 블록.
 *
 * 현재는 직접 입력을 사용한다.
 * 이후 Block Registry 검색/자동완성 UI를 이 타입에 연결한다.
 */

namespace MCFunctionFields {

    export class BlockValue {
        blockId: string;

        constructor(blockId: string) {
            this.blockId = blockId;
        }
    }

    //% group="공통 값"
    //% blockId=mcfunction_block
    //% block="블록 $blockId"
    //% blockId.defl="minecraft:stone"
    export function block(
        blockId: string
    ): BlockValue {

        return new BlockValue(
            blockId
        );
    }
}
