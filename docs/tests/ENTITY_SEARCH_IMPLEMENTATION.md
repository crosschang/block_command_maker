# Entity Registry Search

## Current production-safe implementation

Minecraft MakeCode/PXT extension blocks are generated from the Entity Registry.

Each vanilla entity ID is exposed as an `EntityValue` reporter block, so the built-in MakeCode Toolbox Search can find it by ID:

- `zombie`
- `armor_stand`
- `villager`
- `minecraft:zombie`

The same block has:

- English base label: `entity minecraft:zombie`
- Korean localization: `엔티티 minecraft:zombie`

Custom namespace IDs remain supported by the existing direct-input block.

## Why this implementation

MakeCode documents built-in field editors such as range, color picker, toggle, grid picker, etc. A normal GitHub extension can use these through block annotations.

A new arbitrary searchable popup field would require editor-side registration/custom editor behavior. Editor extensions are subject to target configuration/approved extension URLs, so this project does not make the Minecraft editor target itself a dependency.

Therefore the stable V1 search UX is:

Registry -> generated EntityValue blocks -> MakeCode Toolbox Search

This keeps the project inside the normal Minecraft MakeCode GitHub Extension model.

## Future

If the Minecraft target officially exposes a supported searchable field editor to third-party packages, `RegistrySearchField` can replace the generated search blocks without changing the AST or Registry.
