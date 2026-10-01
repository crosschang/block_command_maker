namespace MCFunctionTest {

    //% block="Selector AST 테스트"
    export function testSelector(): string {
        let selector = MCFunctionAST.createSelector(
            MCFunctionAST.SelectorBase.AllPlayers
        );

        return MCFunctionAST.selectorBaseToken(selector.base);
    }

    //% block="Position AST 테스트"
    export function testPosition(): number {
        let position = MCFunctionAST.createRelativePosition(
            0,
            1,
            0
        );

        return position.y.value;
    }

    //% block="Rotation AST 테스트"
    export function testRotation(): number {
        let rotation = MCFunctionAST.createRelativeRotation(
            90,
            0
        );

        return rotation.yaw.value;
    }

    //% block="Facing AST 테스트"
    export function testFacing(): string {
        let selector = MCFunctionAST.createSelector(
            MCFunctionAST.SelectorBase.AllEntities
        );

        let facing = MCFunctionAST.createFacingEntity(
            selector,
            MCFunctionAST.EntityAnchor.Eyes
        );

        return MCFunctionAST.entityAnchorToken(facing.anchor);
    }

    //% block="Raw Command AST 테스트"
    export function testRawCommand(): string {
        let command = MCFunctionAST.createRawCommand(
            "unknown_command foo bar"
        );

        return command.raw;
    }

    //% block="FunctionLine Comment 테스트"
    export function testFunctionLine(): string {
        let line = MCFunctionAST.createCommentLine(
            "# test comment"
        );

        return line.text;
    }

    //% block="Say Compiler 테스트 %message"
    export function testSayCompiler(message: string): void {
        let command = MCFunctionBlocks.createSayCommand(message);

        let result = MCFunctionCompiler.compileCommand(command);

        player.say(result);
    }

    //% block="Give Compiler 테스트"
    export function testGiveCompiler(): void {

        let target = MCFunctionAST.createSelector(
            MCFunctionAST.SelectorBase.Self
        );

        let command = MCFunctionBlocks.createGiveCommand(
            target,
            "minecraft:diamond",
            3,
            0
        );

        let result =
            MCFunctionCompiler.compileCommand(command);

        player.say(result);
    }

    //% block="Selector Compiler 테스트"
    export function testSelectorCompiler(): void {

        let selector = MCFunctionAST.createSelector(
            MCFunctionAST.SelectorBase.AllPlayers
        );

        let filter = MCFunctionAST.createSelectorFilter(
            "tag",
            "test",
            false
        );

        MCFunctionAST.addSelectorFilter(
            selector,
            filter
        );

        let result =
            MCFunctionCompiler.compileSelector(selector);

        player.say(result);
    }

    //% blockId=mcfunction_give_basic
    //% block="주다 대상 $target 아이템 $item 개수 $amount 데이터 $data"
    //% target.shadow="mcfunction_selector_all_players"
    //% item.shadow="mcfunction_item"
    //% amount.defl=1
    //% data.defl=0
    export function give(
        target: MCFunctionFields.SelectorValue,
        item: MCFunctionFields.ItemValue,
        amount: number,
        data: number
    ): void {

        let command = MCFunctionBlocks.createGiveCommand(
            target.selector,
            item.itemId,
            amount,
            data
        );

        let result =
            MCFunctionCompiler.compileCommand(command);

        player.say(result);
    }

    //% block="Selector 종합 테스트 V2"
    export function testSelectorFullV2(): void {

        let selector = MCFunctionAST.createSelector(
            MCFunctionAST.SelectorBase.AllPlayers
        );

        MCFunctionAST.addSelectorFilter(
            selector,
            MCFunctionAST.createSelectorFilter(
                "tag",
                "test",
                false
            )
        );

        MCFunctionAST.addSelectorFilter(
            selector,
            MCFunctionAST.createSelectorFilter(
                "x",
                "10",
                false
            )
        );

        MCFunctionAST.addSelectorFilter(
            selector,
            MCFunctionAST.createSelectorFilter(
                "z",
                "-5",
                false
            )
        );

        player.say("NEW TEST V2");

        let result =
            MCFunctionCompiler.compileSelectorV2(selector);

        // @를 제외하고 테스트 출력
        player.say("RESULT V2: " + result.slice(1));
    }
}