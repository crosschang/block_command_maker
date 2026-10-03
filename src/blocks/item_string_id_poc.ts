/**
 * Give string-ID POC
 *
 * MakeCode-facing value:
 *   string itemId
 *
 * Core-facing value:
 *   ItemValue -> AST -> Validator -> Compiler
 *
 * This keeps Core semantics unchanged while testing whether direct text input and
 * Registry string reporters can share one MakeCode value input.
 */

namespace MCFunctionCommand {

    //% group="Give"
    //% weight=101
    //% blockId=mcfunction_give_item_id_string_poc
    //% block="give item ID POC|target $target|item ID $itemId|amount $amount"
    //% inlineInputMode=external
    //% target.shadow="mcfunction_selector_self"
    //% itemId.defl="minecraft:diamond_sword"
    //% amount.defl=1
    export function giveItemIdStringPoc(
        target: MCFunctionFields.SelectorValue,
        itemId: string,
        amount: number
    ): void {

        give(
            target,
            MCFunctionFields.item(itemId),
            amount
        );
    }
}
