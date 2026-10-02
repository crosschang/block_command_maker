/**
 * Bedrock Entity Registry V1 Bootstrap
 */

namespace MCFunctionRegistryBedrock {

    export function entityIds(): string[] {

        return [
            "minecraft:player",
            "minecraft:zombie",
            "minecraft:skeleton",
            "minecraft:creeper",
            "minecraft:armor_stand",
            "minecraft:cow",
            "minecraft:pig",
            "minecraft:sheep",
            "minecraft:villager",
            "minecraft:iron_golem",
            "minecraft:item",
            "minecraft:arrow"
        ];
    }

    export function searchEntities(
        query: string,
        limit: number
    ): string[] {

        return MCFunctionRegistry.searchIds(
            entityIds(),
            query,
            limit
        );
    }

    export function isKnownEntity(
        id: string
    ): boolean {

        return MCFunctionRegistry.containsId(
            entityIds(),
            id
        );
    }
}
