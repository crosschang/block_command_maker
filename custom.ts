namespace MCFunctionTest {

    //% block="Selector AST 테스트"
    export function testSelector(): void {
        let selector = MCFunctionAST.createSelector(
            MCFunctionAST.SelectorBase.AllPlayers
        );

        player.say(MCFunctionAST.selectorBaseName(selector.base));
    }

}