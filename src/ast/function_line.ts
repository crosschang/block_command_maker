/**
 * .mcfunction 파일의 한 줄을 표현하는 AST.
 *
 * 명령뿐 아니라 주석과 빈 줄도 보존한다.
 */

namespace MCFunctionAST {

    export enum FunctionLineKind {
        Command = 0,
        Comment = 1,
        Empty = 2
    }

    export interface FunctionLine {
        kind: FunctionLineKind;

        command?: CommandNode;

        /**
         * Comment일 때 원본 주석 내용.
         *
         * 예:
         * # 플레이어 초기화
         */
        comment?: string;
    }

    export function createCommandLine(
        command: CommandNode
    ): FunctionLine {
        return {
            kind: FunctionLineKind.Command,
            command: command
        };
    }

    export function createCommentLine(
        comment: string
    ): FunctionLine {
        return {
            kind: FunctionLineKind.Comment,
            comment: comment
        };
    }

    export function createEmptyLine(): FunctionLine {
        return {
            kind: FunctionLineKind.Empty
        };
    }
}