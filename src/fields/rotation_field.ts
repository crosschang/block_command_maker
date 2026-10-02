/**
 * MakeCode Rotation value wrapper
 *
 * Bedrock tp rotation order:
 * yaw (Y rotation), pitch (X rotation)
 */

//% color="#6A5ACD" weight=87 icon="\uf2f1" block="MCFunction Rotation"
namespace MCFunctionRotationFields {

    export class RotationValue {
        rotation: MCFunctionAST.Rotation;

        constructor(rotation: MCFunctionAST.Rotation) {
            this.rotation = rotation;
        }
    }

    //% blockId=mcfunction_rotation_absolute
    //% block="absolute rotation yaw $yaw pitch $pitch"
    //% yaw.defl=0
    //% pitch.defl=0
    export function absolute(
        yaw: number,
        pitch: number
    ): RotationValue {

        return new RotationValue(
            MCFunctionAST.createAbsoluteRotation(
                yaw,
                pitch
            )
        );
    }

    //% blockId=mcfunction_rotation_relative
    //% block="relative rotation yaw ~$yaw pitch ~$pitch"
    //% yaw.defl=0
    //% pitch.defl=0
    export function relative(
        yaw: number,
        pitch: number
    ): RotationValue {

        return new RotationValue(
            MCFunctionAST.createRelativeRotation(
                yaw,
                pitch
            )
        );
    }
}
