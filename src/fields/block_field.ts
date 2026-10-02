/**
 * MakeCode Block value wrapper
 *
 * Registry 연결 버전.
 *
 * BlockPreset은 src/fields/registry_presets.generated.ts에서 자동 생성된다.
 * 실제 Minecraft ID의 Source of Truth는 registry/source/bedrock/blocks.json이다.
 */

namespace MCFunctionFields {


    export class BlockValue {
        blockId: string;

        constructor(blockId: string) {
            this.blockId = blockId;
        }
    }

    function blockPresetToken(
        preset: BlockPreset
    ): string {

        let ids =
            MCFunctionRegistryBedrock.blockIds();

        let index = preset;

        if (
            index >= 0 &&
            index < ids.length
        ) {
            return ids[index];
        }

        return "minecraft:stone";
    }

    export function blockSelect(
        preset: BlockPreset
    ): BlockValue {

        return new BlockValue(
            blockPresetToken(preset)
        );
    }

    // 기존 blockId는 직접 입력용으로 유지한다.
    // Custom Namespace / Add-on 블록 ID도 허용한다.
    export function block(
        blockId: string
    ): BlockValue {

        return new BlockValue(
            blockId
        );
    }

    export function searchBlockRegistry(
        query: string,
        limit: number
    ): string[] {

        return MCFunctionRegistryBedrock.searchBlocks(
            query,
            limit
        );
    }

    export function isKnownBlockId(
        blockId: string
    ): boolean {

        return MCFunctionRegistryBedrock.isKnownBlock(
            blockId
        );
    }
}
