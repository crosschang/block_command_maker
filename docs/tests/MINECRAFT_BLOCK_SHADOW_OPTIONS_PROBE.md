# minecraftBlock shadowOptions probe

## Purpose

Verify whether a normal Minecraft MakeCode GitHub Extension can pass options
into the target-owned `minecraftBlock` shadow picker.

This does **not** modify the project AST, Parser, Compiler, Registry, or normal
MCFunction blocks.

## Blocks

- D: `PXT probe D minecraftBlock baseline`
- E: `PXT probe E minecraftBlock columns=3`

Both use:

```ts
//% block.shadow=minecraftBlock
```

Only E adds:

```ts
//% block.shadowOptions.columns=3
```

## Test

1. Open `MCFUNCTION PXT PROBE`.
2. Open D's picker and note the number/layout of columns.
3. Close it.
4. Open E's picker and compare.
5. Test both on the web editor and Minecraft Education Code Builder if needed.

## Interpretation

### D and E layouts differ

`shadowOptions` reaches the target-owned `minecraftBlock` picker and at least
some picker configuration is extension-controlled.

Next investigation: identify whether the target picker exposes any option for
its value/data source. Do **not** assume such an option exists merely because
`columns` works.

### D and E are identical

`columns` is not consumed by this target picker (or is overridden). This makes
using `minecraftBlock` as a configurable shell for our Registry less likely,
but it does not by itself prove that every possible target option is blocked.

### E breaks or disappears

The target shadow does not tolerate this option path in this configuration.
Record the exact visual/error behavior.
