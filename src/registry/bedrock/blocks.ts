/**
 * Bedrock Block Registry V1 Bootstrap
 */

namespace MCFunctionRegistryBedrock {

    export function blockIds(): string[] {

        return [
            "minecraft:stone",
            "minecraft:dirt",
            "minecraft:grass_block",
            "minecraft:cobblestone",
            "minecraft:oak_planks",
            "minecraft:glass",
            "minecraft:bedrock",
            "minecraft:diamond_block",
            "minecraft:gold_block",
            "minecraft:iron_block",
            "minecraft:redstone_block",
            "minecraft:air",
            "minecraft:barrier",
            "minecraft:chest"
        ];
    }

    export function searchBlocks(
        query: string,
        limit: number
    ): string[] {

        return MCFunctionRegistry.searchIds(
            blockIds(),
            query,
            limit
        );
    }

    export function isKnownBlock(
        id: string
    ): boolean {

        return MCFunctionRegistry.containsId(
            blockIds(),
            id
        );
    }
}
