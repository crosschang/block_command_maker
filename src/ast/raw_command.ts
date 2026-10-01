/**
 * Raw Command AST
 *
 * Parser가 아직 지원하지 않는 명령이나
 * 원문 보존이 필요한 명령을 그대로 유지하기 위한 AST.
 *
 * Raw Command는 삭제되거나 임의 변환되지 않아야 한다.
 */

namespace MCFunctionAST {

    /**
     * 원본 명령 보존 방식.
     */
    export interface RawCommand extends CommandNode {

        /**
         * Command 종류.
         * 항상 CommandKind.Raw
         */
        kind: CommandKind;

        /**
         * 원본 명령 한 줄.
         *
         * 예:
         * execute as @a run say hello
         * unknown_command foo bar
         */
        raw: string;
    }

    /**
     * Raw Command 생성.
     */
    export function createRawCommand(
        raw: string
    ): RawCommand {
        return {
            kind: CommandKind.Raw,
            raw: raw
        };
    }

    /**
     * Raw Command가 비어있는지 확인.
     *
     * Validator에서 재사용할 수 있다.
     */
    export function isRawCommandEmpty(
        command: RawCommand
    ): boolean {
        return command.raw.length == 0;
    }
}