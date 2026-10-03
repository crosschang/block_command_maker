/**
 * MakeCode command blocks
 *
 * All executable Minecraft command blocks live in one toolbox category:
 * MCFunction Command.
 *
 * MakeCode Block -> Block Adapter -> AST -> Validator -> Compiler -> Minecraft command.
 */

//% color="#4F46E5" weight=96 icon="\uf120" block="MCFunction Command"
//% groups='["Give", "Teleport"]'
namespace MCFunctionCommand {

    function executeGiveValidated(
        command: MCFunctionAST.GiveCommand
    ): void {

        let issues =
            MCFunctionValidator.validateGiveCommand(command);

        if (MCFunctionValidator.hasErrors(issues)) {
            player.say(
                "GIVE ERROR: " +
                MCFunctionValidator.firstErrorMessage(issues)
            );
            return;
        }

        player.execute(
            MCFunctionCompiler.compileCommand(command)
        );
    }

    // ---------------------------------------------------------------------
    // Give
    // ---------------------------------------------------------------------

    //% group="Give"
    //% weight=100
    //% blockId=mcfunction_give_v1_basic
    //% block="give target $target item $item amount $amount"
    //% target.shadow="mcfunction_selector_self"
    //% item.shadow="mcfunction_item_select"
    //% amount.defl=1
    export function give(
        target: MCFunctionFields.SelectorValue,
        item: MCFunctionFields.ItemValue,
        amount: number
    ): void {

        let command =
            MCFunctionBlocks.createGiveCommand(
                target.selector,
                item.itemId,
                amount,
                0
            );

        executeGiveValidated(command);
    }

    //% group="Give"
    //% weight=99
    //% blockId=mcfunction_give_v1_advanced
    //% block="give advanced target $target item $item amount $amount data $data components $components"
    //% target.shadow="mcfunction_selector_self"
    //% item.shadow="mcfunction_item_select"
    //% amount.defl=1
    //% data.defl=0
    //% components.shadow="mcfunction_item_components"
    export function giveAdvanced(
        target: MCFunctionFields.SelectorValue,
        item: MCFunctionFields.ItemValue,
        amount: number,
        data: number,
        components: MCFunctionFields.ItemComponentsValue
    ): void {

        let command =
            MCFunctionBlocks.createGiveCommandWithComponents(
                target.selector,
                item.itemId,
                amount,
                data,
                components.components
            );

        executeGiveValidated(command);
    }

    // ---------------------------------------------------------------------
    // Teleport
    // ---------------------------------------------------------------------

    //% group="Teleport"
    //% weight=90
    //% blockId=mcfunction_tp_position
    //% block="teleport target $target to position $destination check blocks $checkForBlocks"
    //% target.shadow="mcfunction_selector_self"
    //% destination.shadow="mcfunction_position_relative"
    //% checkForBlocks.defl=false
    export function teleportToPosition(
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

    //% group="Teleport"
    //% weight=89
    //% blockId=mcfunction_tp_entity
    //% block="teleport target $target to entity $destination check blocks $checkForBlocks"
    //% target.shadow="mcfunction_selector_self"
    //% destination.shadow="mcfunction_selector_nearest_player"
    //% checkForBlocks.defl=false
    export function teleportToEntity(
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

    //% group="Teleport"
    //% weight=88
    //% blockId=mcfunction_tp_rotation
    //% block="teleport target $target to position $destination rotation $rotation check blocks $checkForBlocks"
    //% target.shadow="mcfunction_selector_self"
    //% destination.shadow="mcfunction_position_relative"
    //% rotation.shadow="mcfunction_rotation_absolute"
    //% checkForBlocks.defl=false
    export function teleportWithRotation(
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

    //% group="Teleport"
    //% weight=87
    //% blockId=mcfunction_tp_facing_position
    //% block="teleport target $target to position $destination facing position $facingPosition check blocks $checkForBlocks"
    //% target.shadow="mcfunction_selector_self"
    //% destination.shadow="mcfunction_position_relative"
    //% facingPosition.shadow="mcfunction_position_relative"
    //% checkForBlocks.defl=false
    export function teleportFacingPosition(
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

    //% group="Teleport"
    //% weight=86
    //% blockId=mcfunction_tp_facing_entity
    //% block="teleport target $target to position $destination facing entity $facingEntity check blocks $checkForBlocks"
    //% target.shadow="mcfunction_selector_self"
    //% destination.shadow="mcfunction_position_relative"
    //% facingEntity.shadow="mcfunction_selector_nearest_player"
    //% checkForBlocks.defl=false
    export function teleportFacingEntity(
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
