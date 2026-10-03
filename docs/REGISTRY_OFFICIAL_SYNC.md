# Official Registry Sync

This project can update its Entity / Item / Block libraries directly from Microsoft's official Minecraft Creator documentation sources.

## Official sources

- Item: `creator/Commands/enums/Item.md`
  - Used by `/give`, `/clear`, `/replaceitem`.
  - Only canonical `minecraft:*` entries are imported.
- Block: `creator/Commands/enums/Block.md`
  - Used by block-taking commands such as `/setblock`, `/fill`, `/clone`, and execute block conditions.
  - Only canonical `minecraft:*` entries are imported.
- Entity: `creator/Reference/Content/VanillaListingsReference/Entities.md`
  - `undefined_test_only` is intentionally excluded.

## Run

From the repository root:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\tools\update_registry_from_official.ps1
```

Or double-click:

```text
tools\update_registry_latest.cmd
```

Dry run:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\tools\update_registry_from_official.ps1 -DryRun
```

## What gets updated

Source of Truth:

```text
registry/source/bedrock/items.json
registry/source/bedrock/blocks.json
registry/source/bedrock/entities.json
```

Then `generate_registry.ps1` regenerates:

```text
registry/bedrock/items.ts
registry/bedrock/blocks.ts
registry/bedrock/entities.ts

src/libraries/item_library.generated.ts
src/libraries/block_library.generated.ts
src/libraries/entity_library.generated.ts
```

The Korean Registry localization is synchronized by `tools/sync_korean_localization.ps1`.
It rebuilds only generated Item / Block / Entity Registry labels and preserves manual UI translations.
The sync is case-sensitive, so IDs whose generated function names differ only by letter case are kept separately.

## Korean localization only

To rebuild the Korean Registry labels without downloading Registry data:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\tools\sync_korean_localization.ps1
```

Or double-click:

```text
tools\sync_korean_localization.cmd
```

The old one-off `fix_*` / `repair_*` localization patch scripts are no longer used.

## Quick presets are separate

The normal dropdowns intentionally stay small and stable:

```text
registry/source/presets.json
        ↓
src/fields/registry_presets.generated.ts
```

Updating the full Registry therefore does **not** turn the quick-select dropdown into a list of thousands of values and does not renumber the existing curated preset values.

## Platform rule

These sources are Minecraft Bedrock Stable official documentation.

Do **not** infer that every newly listed Bedrock value is already available in the current Minecraft Education build. Education support should be represented and validated separately.

Custom namespace IDs remain available through the direct-input blocks.
