/**
 * MakeCode Block ↔ Minecraft Command AST Adapter
 */

namespace MCFunctionBlocks {

    export function createRawCommand(text: string): MCFunctionAST.RawCommand {
        return MCFunctionAST.createRawCommand(text);
    }

    export function createAbsolutePosition(x: number,y: number,z: number): MCFunctionAST.Position {
        return MCFunctionAST.createAbsolutePosition(x, y, z);
    }

    export function createRelativePosition(x: number,y: number,z: number): MCFunctionAST.Position {
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

    export function createSayCommand(
        message: string
    ): MCFunctionAST.SayCommand {
        return MCFunctionAST.createSayCommand(message);
    }

    export function createGiveCommand(target:MCFunctionAST.Selector,itemId: string,amount: number,data: number): MCFunctionAST.GiveCommand {

        let item = MCFunctionAST.createItemStack(
            itemId,
            amount,
            data
        );

        return MCFunctionAST.createGiveCommand(
            target,
            item
        );
    }

    export function createGiveCommandWithComponents(
        target: MCFunctionAST.Selector,
        itemId: string,
        amount: number,
        data: number,
        components: MCFunctionAST.ItemCommandComponents
    ): MCFunctionAST.GiveCommand {

        let item =
            MCFunctionAST.createItemStackWithComponents(
                itemId,
                amount,
                data,
                components
            );

        return MCFunctionAST.createGiveCommand(
            target,
            item
        );
    }
}