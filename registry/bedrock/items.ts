/**
 * AUTO-GENERATED FILE. DO NOT EDIT BY HAND.
 *
 * Source: registry/source/bedrock/items.json
 * Generator: tools/generate_registry.ps1
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
