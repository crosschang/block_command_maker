/**
 * MakeCode Item value wrapper
 *
 * Registry 연결 버전.
 *
 * ItemPreset은 src/fields/registry_presets.generated.ts에서 자동 생성된다.
 * 실제 Minecraft ID의 Source of Truth는 registry/source/bedrock/items.json이다.
 * 직접 입력은 Custom Namespace를 위해 계속 허용한다.
 */

namespace MCFunctionFields {


    export class ItemValue {
        itemId: string;

        constructor(itemId: string) {
            this.itemId = itemId;
        }
    }

    /**
     * Quick Preset enum -> Minecraft ID
     *
     * ItemPreset 값은 Full Registry 배열의 index가 아니다.
     * registry/source/presets.json에서 생성된 전용 매핑을 사용한다.
     */
    function itemPresetToken(
        preset: ItemPreset
    ): string {

        return itemPresetId(preset);
    }

    export function itemSelect(
        preset: ItemPreset
    ): ItemValue {

        return new ItemValue(
            itemPresetToken(preset)
        );
    }

    // 기존 blockId는 직접 입력용으로 유지한다.
    // Registry에 없는 Custom Namespace도 허용한다.
    export function item(
        itemId: string
    ): ItemValue {

        return new ItemValue(
            itemId
        );
    }

    /**
     * 이후 검색 Field에서 그대로 사용할 Registry API.
     * 블록으로 노출하지 않는다.
     */
    export function searchItemRegistry(
        query: string,
        limit: number
    ): string[] {

        return MCFunctionRegistryBedrock.searchItems(
            query,
            limit
        );
    }

    export function isKnownItemId(
        itemId: string
    ): boolean {

        return MCFunctionRegistryBedrock.isKnownItem(
            itemId
        );
    }
}
