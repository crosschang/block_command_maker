/**
 * Minecraft Command AST
 *
 * 모든 Minecraft 명령 AST의 공통 기반.
 *
 * MakeCode Block이나 .mcfunction 문자열 자체가 아니라
 * 이 AST가 명령 의미의 Source of Truth가 된다.
 */

namespace MCFunctionAST {

    /**
     * AST에서 사용하는 명령 종류.
     *
     * 처음에는 M2에서 구현할 핵심 명령만 등록한다.
     * 명령 지원이 늘어날 때 이 enum을 확장한다.
     */
    export enum CommandKind {
        Raw = 0,
        Say = 1,
        Give = 2,
        Teleport = 3,
        Summon = 4,
        SetBlock = 5
    }

    /**
     * 모든 Minecraft Command AST가 공유하는 기본 구조.
     */
    export interface CommandNode {
        kind: CommandKind;
    }

    /**
     * 디버깅 및 Validator에서 사용할 명령 종류 이름.
     *
     * 실제 .mcfunction 명령 문자열을 생성하는 함수가 아니다.
     * 명령 문자열 생성은 Compiler 계층에서 담당한다.
     */
    export function commandKindName(kind: CommandKind): string {
        switch (kind) {
            case CommandKind.Raw:
                return "raw";

            case CommandKind.Say:
                return "say";

            case CommandKind.Give:
                return "give";

            case CommandKind.Teleport:
                return "teleport";

            case CommandKind.Summon:
                return "summon";

            case CommandKind.SetBlock:
                return "setblock";

            default:
                return "unknown";
        }
    }
}