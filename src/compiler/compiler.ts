/**
 * Minecraft Command Compiler
 *
 * AST → .mcfunction command string
 */

namespace MCFunctionCompiler {

    export function compileCommand(
        command: MCFunctionAST.CommandNode
    ): string {

        switch (command.kind) {

            case MCFunctionAST.CommandKind.Raw:
                return compileRawCommand(
                    <MCFunctionAST.RawCommand>command
                );

            case MCFunctionAST.CommandKind.Say:
                return compileSayCommand(
                    <MCFunctionAST.SayCommand>command
                );
            
            case MCFunctionAST.CommandKind.Give:
            return compileGiveCommand(
                <MCFunctionAST.GiveCommand>command
            );

            default:
                return "";
        }
    }

    function compileRawCommand(
        command: MCFunctionAST.RawCommand
    ): string {
        return command.raw;
    }

    function compileSayCommand(
        command: MCFunctionAST.SayCommand
    ): string {
        return "say " + command.message;
    }

    function compileGiveCommand(
    command: MCFunctionAST.GiveCommand
    ): string {

        let target =
            compileSelector(command.target);

        return "give "
            + target
            + " "
            + command.item.id
            + " "
            + command.item.amount
            + " "
            + command.item.data;
    }

    export function compileSelector(
        selector: MCFunctionAST.Selector
    ): string {

        let result =
            MCFunctionAST.selectorBaseToken(selector.base);

        if (selector.filters.length == 0) {
            return result;
        }

        result += "[";

        for (let i = 0; i < selector.filters.length; i++) {
            if (i > 0) {
                result += ",";
            }

            let filter = selector.filters[i];

            result += filter.key + "=";

            if (filter.inverted) {
                result += "!";
            }

            result += filter.value;
        }

        result += "]";

        return result;
    }

    export function compileSelectorV2(
        selector: MCFunctionAST.Selector
    ): string {

        let output = MCFunctionAST.selectorBaseToken(selector.base);

        if (selector.filters.length == 0) {
            return output;
        }

        output = output + "[";

        for (let i = 0; i < selector.filters.length; i++) {

            if (i > 0) {
                output = output + ",";
            }

            let filter = selector.filters[i];

            output = output + filter.key + "=";

            if (filter.inverted) {
                output = output + "!";
            }

            output = output + filter.value;
        }

        output = output + "]";

        return output;
    }
}