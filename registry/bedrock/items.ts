/**
 * Bedrock Item Registry V1 Bootstrap
 *
 * 현재는 Registry 시스템/검색 흐름 검증용 대표 데이터.
 * 이후 공식 데이터 기준으로 전체 목록을 확장한다.
 */

namespace MCFunctionRegistryBedrock {

    export function itemIds(): string[] {

        return [
            "minecraft:stone",
            "minecraft:dirt",
            "minecraft:diamond",
            "minecraft:emerald",
            "minecraft:iron_ingot",
            "minecraft:gold_ingot",
            "minecraft:diamond_sword",
            "minecraft:diamond_pickaxe",
            "minecraft:bow",
            "minecraft:arrow",
            "minecraft:apple",
            "minecraft:bread",
            "minecraft:paper",
            "minecraft:name_tag",
            "minecraft:compass",
            "minecraft:clock",
            "minecraft:stick",
            "minecraft:book"
        ];
    }

    export function searchItems(
        query: string,
        limit: number
    ): string[] {

        return MCFunctionRegistry.searchIds(
            itemIds(),
            query,
            limit
        );
    }

    export function isKnownItem(
        id: string
    ): boolean {

        return MCFunctionRegistry.containsId(
            itemIds(),
            id
        );
    }
}
