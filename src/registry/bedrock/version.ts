/**
 * Bedrock Registry Snapshot Metadata
 *
 * 실제 Minecraft 버전별 데이터가 들어오기 시작하면
 * 이 파일의 snapshot id / game version을 함께 갱신한다.
 */

namespace MCFunctionRegistryBedrock {

    export function schemaVersion(): number {
        return 1;
    }

    export function snapshotId(): string {
        return "bedrock-v1-bootstrap";
    }

    export function gameVersion(): string {
        return "unversioned-bootstrap";
    }
}
