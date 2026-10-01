namespace MCFunctionTest {

    export function testCommandKind(): string {
        let kind = MCFunctionAST.CommandKind.Say;
        return MCFunctionAST.commandKindName(kind);
    }

}