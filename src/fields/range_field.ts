/**
 * MakeCode Range value blocks
 */

namespace MCFunctionFields {

    export class RangeValue {
        range: MCFunctionAST.NumberRange;

        constructor(range: MCFunctionAST.NumberRange) {
            this.range = range;
        }
    }

    //% blockId=mcfunction_range_min
    //% block="범위 $min 이상"
    //% min.defl=0
    export function rangeMin(
        min: number
    ): RangeValue {
        return new RangeValue(
            MCFunctionAST.createMinRange(min)
        );
    }

    //% blockId=mcfunction_range_max
    //% block="범위 $max 이하"
    //% max.defl=10
    export function rangeMax(
        max: number
    ): RangeValue {
        return new RangeValue(
            MCFunctionAST.createMaxRange(max)
        );
    }

    //% blockId=mcfunction_range_min_max
    //% block="범위 $min 에서 $max"
    //% min.defl=0
    //% max.defl=10
    export function rangeMinMax(
        min: number,
        max: number
    ): RangeValue {
        return new RangeValue(
            MCFunctionAST.createMinMaxRange(min, max)
        );
    }
}