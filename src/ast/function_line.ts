/**
 * .mcfunction 파일의 한 줄을 표현하는 AST.
 *
 * 명령, 주석, 빈 줄을 구분하여
 * 원본 파일 구조를 보존한다.
 */

namespace MCFunctionAST {

    export enum FunctionLineKind {
        Command = 0,
        Comment = 1,
        Empty = 2
    }

    export interface FunctionLine {
        kind: FunctionLineKind;

        /**
         * 주석이나 원본 텍스트 보존용.
         *
         * Comment:
         * # 플레이어 초기화
         *
         * Empty:
         * ""
         */
        text: string;

        /**
         * Command 줄일 때 사용하는 AST.
         */
        command?: CommandNode;
    }

    export function createCommandLine(
        command: CommandNode
    ): FunctionLine {
        return {
            kind: FunctionLineKind.Command,
            text: "",
            command: command
        };
    }

    export function createCommentLine(
        text: string
    ): FunctionLine {
        return {
            kind: FunctionLineKind.Comment,
            text: text
        };
    }

    export function createEmptyLine(): FunctionLine {
        return {
            kind: FunctionLineKind.Empty,
            text: ""
        };
    }
}