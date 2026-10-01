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
            MCFunctionAST.selectorBaseToken(command.target.base);

        return "give "
            + target
            + " "
            + command.item.id
            + " "
            + command.item.amount
            + " "
            + command.item.data;
    }
}