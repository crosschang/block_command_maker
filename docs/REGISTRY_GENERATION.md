# Registry code generation

## Goal

`ItemPreset`, `BlockPreset`, `EntityPreset` are **generated**, not hand-maintained.

The single source of truth is:

```text
registry/source/bedrock/items.json
registry/source/bedrock/blocks.json
registry/source/bedrock/entities.json
```

Running the generator creates:

```text
registry/bedrock/items.ts
registry/bedrock/blocks.ts
registry/bedrock/entities.ts
src/fields/registry_presets.generated.ts
```

The generated TypeScript files are committed to Git because Minecraft MakeCode does not run the local PowerShell generator when importing the GitHub extension.

## Normal workflow

1. Edit only the JSON Registry source.
2. In the repository root run:

```powershell
powershell -ExecutionPolicy Bypass -File .\tools\generate_registry.ps1
```

3. Compile in MakeCode.
4. Review generated changes in GitHub Desktop.
5. Commit and push.

## Check without changing files

```powershell
powershell -ExecutionPolicy Bypass -File .\tools\generate_registry.ps1 -Check
```

If a generated file is stale, the command fails and tells you to regenerate.

## Adding an ID

Example:

```json
{
  "id": "minecraft:andesite"
}
```

Add it to the correct `entries` array and run the generator.

The generator updates both:

- the runtime Registry array
- the MakeCode enum dropdown

So there is no manual enum/Registry order synchronization anymore.

## Custom Namespace

Custom IDs are still entered through the direct-input blocks.

A Registry miss must not automatically block compilation.

## Future search field

The JSON source is also the future input for searchable/autocomplete fields. The current generated enum dropdown remains a safe fallback until the search field is stable.
