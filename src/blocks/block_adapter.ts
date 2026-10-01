/**
 * MakeCode Block ↔ Minecraft Command AST Adapter
 */

namespace MCFunctionBlocks {

    export function createRawCommand(
        text: string
    ): MCFunctionAST.RawCommand {
        return MCFunctionAST.createRawCommand(text);
    }

    export function createAbsolutePosition(
        x: number,
        y: number,
        z: number
    ): MCFunctionAST.Position {
        return MCFunctionAST.createAbsolutePosition(x, y, z);
    }

    export function createRelativePosition(
        x: number,
        y: number,
        z: number
    ): MCFunctionAST.Position {
        return MCFunctionAST.createRelativePosition(x, y, z);
    }

    export function createLocalPosition(
        x: number,
        y: number,
        z: number
    ): MCFunctionAST.Position {
        return MCFunctionAST.createLocalPosition(x, y, z);
    }

    export function createSelector(
        base: MCFunctionAST.SelectorBase
    ): MCFunctionAST.Selector {
        return MCFunctionAST.createSelector(base);
    }
}