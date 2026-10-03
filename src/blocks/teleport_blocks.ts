/**
 * Compatibility wrappers for projects/JavaScript that used the old
 * MCFunctionTeleport namespace before executable command blocks were moved
 * into the unified MCFunction Command toolbox category.
 *
 * These functions intentionally have no block annotations, so they do not
 * create a second toolbox category.
 */
namespace MCFunctionTeleport {

    export function toPosition(
        target: MCFunctionFields.SelectorValue,
        destination: MCFunctionPositionFields.PositionValue,
        checkForBlocks: boolean
    ): void {
        MCFunctionCommand.teleportToPosition(
            target,
            destination,
            checkForBlocks
        );
    }

    export function toEntity(
        target: MCFunctionFields.SelectorValue,
        destination: MCFunctionFields.SelectorValue,
        checkForBlocks: boolean
    ): void {
        MCFunctionCommand.teleportToEntity(
            target,
            destination,
            checkForBlocks
        );
    }

    export function withRotation(
        target: MCFunctionFields.SelectorValue,
        destination: MCFunctionPositionFields.PositionValue,
        rotation: MCFunctionRotationFields.RotationValue,
        checkForBlocks: boolean
    ): void {
        MCFunctionCommand.teleportWithRotation(
            target,
            destination,
            rotation,
            checkForBlocks
        );
    }

    export function facingPosition(
        target: MCFunctionFields.SelectorValue,
        destination: MCFunctionPositionFields.PositionValue,
        facingPosition: MCFunctionPositionFields.PositionValue,
        checkForBlocks: boolean
    ): void {
        MCFunctionCommand.teleportFacingPosition(
            target,
            destination,
            facingPosition,
            checkForBlocks
        );
    }

    export function facingEntity(
        target: MCFunctionFields.SelectorValue,
        destination: MCFunctionPositionFields.PositionValue,
        facingEntity: MCFunctionFields.SelectorValue,
        checkForBlocks: boolean
    ): void {
        MCFunctionCommand.teleportFacingEntity(
            target,
            destination,
            facingEntity,
            checkForBlocks
        );
    }
}
