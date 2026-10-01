/**
 * Minecraft Selector AST
 */

namespace MCFunctionAST {

    export enum SelectorBase {
        AllPlayers = 0,      // @a
        AllEntities = 1,     // @e
        NearestPlayer = 2,   // @p
        RandomPlayer = 3,    // @r
        Self = 4,            // @s
        Initiator = 5        // @initiator
    }

    export interface SelectorFilter {
        key: string;
        value: string;
        inverted?: boolean;
    }

    export interface Selector {
        base: SelectorBase;
        filters: SelectorFilter[];
    }

    export function selectorBaseName(base: SelectorBase): string {
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

    export function createSelector(base: SelectorBase): Selector {
        return {
            base: base,
            filters: []
        };
    }

    export function addSelectorFilter(
        selector: Selector,
        key: string,
        value: string,
        inverted?: boolean
    ): void {
        selector.filters.push({
            key: key,
            value: value,
            inverted: inverted
        });
    }
}