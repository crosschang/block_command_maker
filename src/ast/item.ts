/**
 * Minecraft Item AST
 *
 * give, clear, replaceitem 등에서 공통으로 사용한다.
 */

namespace MCFunctionAST {

    export interface ItemStack {
        id: string;
        amount: number;
        data: number;
    }

    export function createItemStack(
        id: string,
        amount: number,
        data: number
    ): ItemStack {
        return {
            id: id,
            amount: amount,
            data: data
        };
    }
}