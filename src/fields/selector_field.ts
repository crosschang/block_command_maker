/**
 * MakeCode Selector value wrapper
 *
 * Blockly/MakeCode UI에서 Selector를 값 블록으로 연결하기 위한 타입.
 * 실제 명령 의미는 내부 Selector AST가 보존한다.
 */

namespace MCFunctionFields {

    export class SelectorValue {
        selector: MCFunctionAST.Selector;

        constructor(selector: MCFunctionAST.Selector) {
            this.selector = selector;
        }
    }

    //% blockId=mcfunction_selector_all_players
    //% block="모든 플레이어 @a"
    export function allPlayers(): SelectorValue {
        return new SelectorValue(
            MCFunctionAST.createSelector(
                MCFunctionAST.SelectorBase.AllPlayers
            )
        );
    }

    //% blockId=mcfunction_selector_all_entities
    //% block="모든 엔티티 @e"
    export function allEntities(): SelectorValue {
        return new SelectorValue(
            MCFunctionAST.createSelector(
                MCFunctionAST.SelectorBase.AllEntities
            )
        );
    }

    //% blockId=mcfunction_selector_nearest_player
    //% block="가장 가까운 플레이어 @p"
    export function nearestPlayer(): SelectorValue {
        return new SelectorValue(
            MCFunctionAST.createSelector(
                MCFunctionAST.SelectorBase.NearestPlayer
            )
        );
    }

    //% blockId=mcfunction_selector_random_player
    //% block="무작위 플레이어 @r"
    export function randomPlayer(): SelectorValue {
        return new SelectorValue(
            MCFunctionAST.createSelector(
                MCFunctionAST.SelectorBase.RandomPlayer
            )
        );
    }

    //% blockId=mcfunction_selector_self
    //% block="자신 @s"
    export function self(): SelectorValue {
        return new SelectorValue(
            MCFunctionAST.createSelector(
                MCFunctionAST.SelectorBase.Self
            )
        );
    }

    //% blockId=mcfunction_selector_initiator
    //% block="대화 시작 플레이어 @initiator"
    export function initiator(): SelectorValue {
        return new SelectorValue(
            MCFunctionAST.createSelector(
                MCFunctionAST.SelectorBase.Initiator
            )
        );
    }
}