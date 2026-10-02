/**
 * Minecraft Selector AST
 *
 * @a, @e, @p, @r, @s, @initiator와
 * Selector Filter를 구조화해서 표현한다.
 */

namespace MCFunctionAST {

    /**
     * Selector의 기본 대상.
     */
    export enum SelectorBase {
        AllPlayers = 0,      // @a
        AllEntities = 1,     // @e
        NearestPlayer = 2,   // @p
        RandomPlayer = 3,    // @r
        Self = 4,            // @s
        Initiator = 5        // @initiator
    }

    /**
     * Selector Filter의 기본 구조.
     *
     * 초기에는 범용 key/value 구조를 사용하고,
     * type, tag, scores, hasitem 등은 이후 세분화한다.
     */
    export interface SelectorFilter {
        key: string;
        value: string;
        inverted: boolean;
    }

    export interface SelectorScoreCondition {
        objective: string;
        range: NumberRange;
        inverted: boolean;
    }

    export interface SelectorHasItemCondition {
        itemId: string;
        quantity: NumberRange;
    }

    /**
     * Selector AST.
     */
    export interface Selector {
        base: SelectorBase;
        filters: SelectorFilter[];
        scores: SelectorScoreCondition[];
        hasItems: SelectorHasItemCondition[];
    }

    /**
     * SelectorBase를 Minecraft selector 문자열로 변환한다.
     *
     * 이 함수는 Selector 전체 명령을 컴파일하지 않는다.
     * 기본 selector 토큰만 반환한다.
     */
    export function selectorBaseToken(base: SelectorBase): string {
        switch (base) {
            case SelectorBase.AllPlayers:
                return "@a";

            case SelectorBase.AllEntities:
                return "@e";

            case SelectorBase.NearestPlayer:
                return "@p";

            case SelectorBase.RandomPlayer:
                return "@r";

            case SelectorBase.Self:
                return "@s";

            case SelectorBase.Initiator:
                return "@initiator";

            default:
                return "@s";
        }
    }

    /**
     * 기본 Selector 생성.
     */
    export function createSelector(base: SelectorBase): Selector {
        return {
            base: base,
            filters: [],
            scores: [],
            hasItems: []
        };
    }

    /**
     * Selector Filter 생성.
     */
    export function createSelectorFilter(
        key: string,
        value: string,
        inverted: boolean
    ): SelectorFilter {
        return {
            key: key,
            value: value,
            inverted: inverted
        };
    }

    /**
     * Selector에 Filter 추가.
     */
    export function addSelectorFilter(
        selector: Selector,
        filter: SelectorFilter
    ): void {
        selector.filters.push(filter);
    }

    export function createSelectorScoreCondition(
        objective: string,
        range: NumberRange,
        inverted: boolean
    ): SelectorScoreCondition {
        return {
            objective: objective,
            range: range,
            inverted: inverted
        };
    }

    export function addSelectorScoreCondition(
        selector: Selector,
        condition: SelectorScoreCondition
    ): void {
        selector.scores.push(condition);
    }

    export function createSelectorHasItemCondition(
        itemId: string,
        quantity: NumberRange
    ): SelectorHasItemCondition {
        return {
            itemId: itemId,
            quantity: quantity
        };
    }

    export function addSelectorHasItemCondition(
        selector: Selector,
        condition: SelectorHasItemCondition
    ): void {
        selector.hasItems.push(condition);
    }
}