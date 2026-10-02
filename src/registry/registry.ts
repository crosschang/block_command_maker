/**
 * Minecraft Registry Common V1
 *
 * Registry는 Minecraft가 미리 정의한 ID 목록을 관리한다.
 * 직접 입력(Custom Namespace)은 막지 않는다.
 *
 * 이 파일은 검색/검증용 공통 도우미만 제공한다.
 * 실제 데이터는 Bedrock / Education 파일을 분리해서 관리한다.
 */

namespace MCFunctionRegistry {

    export enum RegistryKind {
        Item = 0,
        Block = 1,
        Entity = 2
    }

    export function containsId(
        ids: string[],
        id: string
    ): boolean {

        for (let i = 0; i < ids.length; i++) {
            if (ids[i] == id) {
                return true;
            }
        }

        return false;
    }

    export function matchesId(
        id: string,
        query: string
    ): boolean {

        if (query.length == 0) {
            return true;
        }

        let source = id.toLowerCase();
        let target = query.toLowerCase();

        return source.indexOf(target) >= 0;
    }

    export function searchIds(
        ids: string[],
        query: string,
        limit: number
    ): string[] {

        let result: string[] = [];

        if (limit <= 0) {
            limit = 20;
        }

        for (let i = 0; i < ids.length; i++) {

            if (matchesId(ids[i], query)) {

                result.push(ids[i]);

                if (result.length >= limit) {
                    break;
                }
            }
        }

        return result;
    }
}
