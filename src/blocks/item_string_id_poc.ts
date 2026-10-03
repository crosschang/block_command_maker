/**
 * Give string-ID POC
 *
 * MakeCode-facing value:
 *   string itemId
 *
 * Core-facing value:
 *   ItemValue -> AST -> Validator -> Compiler
 *
 * POC V2:
 * - itemId is a real value input with a hidden string shadow block.
 * - Users can type a Minecraft ID directly into the shadow block.
 * - String reporter blocks from MCFunctionItemLibrary can be plugged into
 *   the same input and replace the shadow block.
 */

namespace MCFunctionCommand {

    /**
     * Hidden text shadow used by string-ID command inputs.
     * This turns the parent parameter into a real Blockly/PXT input while
     * preserving direct text entry as the default UI.
     */
    //% blockId=mcfunction_item_id_text_shadow
    //% block="$value"
    //% blockHidden=true
    //% value.defl="minecraft:diamond_sword"
    export function itemIdTextShadow(value: string): string {
        return value;
    }

    //% group="Give"
    //% weight=101
    //% blockId=mcfunction_give_item_id_string_poc
    //% block="give item ID POC|target $target|item ID $itemId|amount $amount"
    //% inlineInputMode=external
    //% target.shadow="mcfunction_selector_self"
    //% itemId.shadow="mcfunction_item_id_text_shadow"
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
