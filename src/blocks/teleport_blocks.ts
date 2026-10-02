/**
 * MakeCode Teleport blocks
 *
 * AST -> Compiler -> Minecraft command execution.
 *
 * .mcfunction export path can reuse the same AST/Compiler later.
 */

//% color="#4F46E5" weight=96 icon="\uf0b2" block="MCFunction TP"
//% groups='["Basic Movement", "Rotation & Facing"]'
namespace MCFunctionTeleport {

    //% group="Basic Movement"
    //% blockId=mcfunction_tp_position
    //% block="teleport target $target to position $destination check blocks $checkForBlocks"
    //% target.shadow="mcfunction_selector_self"
    //% destination.shadow="mcfunction_position_relative"
    //% checkForBlocks.defl=false
    export function toPosition(
        target: MCFunctionFields.SelectorValue,
        destination: MCFunctionPositionFields.PositionValue,
        checkForBlocks: boolean
    ): void {

        let command =
            MCFunctionBlocks.createTeleportToPositionCommand(
                target.selector,
                destination.position,
                checkForBlocks
            );

        player.execute(
            MCFunctionCompiler.compileCommand(command)
        );
    }

    //% group="Basic Movement"
    //% blockId=mcfunction_tp_entity
    //% block="teleport target $target to entity $destination check blocks $checkForBlocks"
    //% target.shadow="mcfunction_selector_self"
    //% destination.shadow="mcfunction_selector_nearest_player"
    //% checkForBlocks.defl=false
    export function toEntity(
        target: MCFunctionFields.SelectorValue,
        destination: MCFunctionFields.SelectorValue,
        checkForBlocks: boolean
    ): void {

        let command =
            MCFunctionBlocks.createTeleportToEntityCommand(
                target.selector,
                destination.selector,
                checkForBlocks
            );

        player.execute(
            MCFunctionCompiler.compileCommand(command)
        );
    }

    //% group="Rotation & Facing"
    //% blockId=mcfunction_tp_rotation
    //% block="teleport target $target to position $destination rotation $rotation check blocks $checkForBlocks"
    //% target.shadow="mcfunction_selector_self"
    //% destination.shadow="mcfunction_position_relative"
    //% rotation.shadow="mcfunction_rotation_absolute"
    //% checkForBlocks.defl=false
    export function withRotation(
        target: MCFunctionFields.SelectorValue,
        destination: MCFunctionPositionFields.PositionValue,
        rotation: MCFunctionRotationFields.RotationValue,
        checkForBlocks: boolean
    ): void {

        let command =
            MCFunctionBlocks.createTeleportWithRotationCommand(
                target.selector,
                destination.position,
                rotation.rotation,
                checkForBlocks
            );

        player.execute(
            MCFunctionCompiler.compileCommand(command)
        );
    }

    //% group="Rotation & Facing"
    //% blockId=mcfunction_tp_facing_position
    //% block="teleport target $target to position $destination facing position $facingPosition check blocks $checkForBlocks"
    //% target.shadow="mcfunction_selector_self"
    //% destination.shadow="mcfunction_position_relative"
    //% facingPosition.shadow="mcfunction_position_relative"
    //% checkForBlocks.defl=false
    export function facingPosition(
        target: MCFunctionFields.SelectorValue,
        destination: MCFunctionPositionFields.PositionValue,
        facingPosition: MCFunctionPositionFields.PositionValue,
        checkForBlocks: boolean
    ): void {

        let command =
            MCFunctionBlocks.createTeleportFacingPositionCommand(
                target.selector,
                destination.position,
                facingPosition.position,
                checkForBlocks
            );

        player.execute(
            MCFunctionCompiler.compileCommand(command)
        );
    }

    //% group="Rotation & Facing"
    //% blockId=mcfunction_tp_facing_entity
    //% block="teleport target $target to position $destination facing entity $facingEntity check blocks $checkForBlocks"
    //% target.shadow="mcfunction_selector_self"
    //% destination.shadow="mcfunction_position_relative"
    //% facingEntity.shadow="mcfunction_selector_nearest_player"
    //% checkForBlocks.defl=false
    export function facingEntity(
        target: MCFunctionFields.SelectorValue,
        destination: MCFunctionPositionFields.PositionValue,
        facingEntity: MCFunctionFields.SelectorValue,
        checkForBlocks: boolean
    ): void {

        let command =
            MCFunctionBlocks.createTeleportFacingEntityCommand(
                target.selector,
                destination.position,
                facingEntity.selector,
                checkForBlocks
            );

        player.execute(
            MCFunctionCompiler.compileCommand(command)
        );
    }
}
