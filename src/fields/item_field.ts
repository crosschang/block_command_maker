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
     * Preset enum -> Registry ID
     *
     * switch에 Minecraft ID를 중복 저장하지 않는다.
     * Registry 배열이 실제 ID Source of Truth다.
     */
    function itemPresetToken(
        preset: ItemPreset
    ): string {

        let ids =
            MCFunctionRegistryBedrock.itemIds();

        let index = preset;

        if (
            index >= 0 &&
            index < ids.length
        ) {
            return ids[index];
        }

        return "minecraft:stone";
    }

    //% group="아이템"
    //% blockId=mcfunction_item_select
    //% block="아이템 선택 $preset"
    export function itemSelect(
        preset: ItemPreset
    ): ItemValue {

        return new ItemValue(
            itemPresetToken(preset)
        );
    }

    // 기존 blockId는 직접 입력용으로 유지한다.
    // Registry에 없는 Custom Namespace도 허용한다.
    //% group="아이템"
    //% blockId=mcfunction_item
    //% block="아이템 직접 입력 $itemId"
    //% itemId.defl="minecraft:stone"
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
