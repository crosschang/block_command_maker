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
}