/**
 * Minecraft Education Registry Snapshot Metadata
 *
 * Bedrock Registry와 섞지 않는다.
 * Education 전용/차이 데이터가 확인될 때 이 영역에 별도로 기록한다.
 */

namespace MCFunctionRegistryEducation {

    export function schemaVersion(): number {
        return 1;
    }

    export function snapshotId(): string {
        return "education-v1-bootstrap";
    }

    export function gameVersion(): string {
        return "unversioned-bootstrap";
    }
}
