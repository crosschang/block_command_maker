/**
 * MakeCode Position value wrapper
 *
 * Position AST를 MakeCode 값 블록으로 연결한다.
 */

//% color="#6A5ACD" weight=88 icon="\uf041" block="MCFunction Position"
namespace MCFunctionPositionFields {

    export class PositionValue {
        position: MCFunctionAST.Position;

        constructor(position: MCFunctionAST.Position) {
            this.position = position;
        }
    }

    //% blockId=mcfunction_position_absolute
    //% block="absolute position x $x y $y z $z"
    //% x.defl=0
    //% y.defl=64
    //% z.defl=0
    export function absolute(
        x: number,
        y: number,
        z: number
    ): PositionValue {

        return new PositionValue(
            MCFunctionAST.createAbsolutePosition(
                x,
                y,
                z
            )
        );
    }

    //% blockId=mcfunction_position_relative
    //% block="relative position x ~$x y ~$y z ~$z"
    //% x.defl=0
    //% y.defl=0
    //% z.defl=0
    export function relative(
        x: number,
        y: number,
        z: number
    ): PositionValue {

        return new PositionValue(
            MCFunctionAST.createRelativePosition(
                x,
                y,
                z
            )
        );
    }

    //% blockId=mcfunction_position_local
    //% block="local position x ^$x y ^$y z ^$z"
    //% x.defl=0
    //% y.defl=0
    //% z.defl=1
    export function local(
        x: number,
        y: number,
        z: number
    ): PositionValue {

        return new PositionValue(
            MCFunctionAST.createLocalPosition(
                x,
                y,
                z
            )
        );
    }
}
