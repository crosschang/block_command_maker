# Minecraft Native Catalog Probe

Purpose: determine what target-owned native selectors are available without changing the MCFunction AST/Registry core.

## D — minecraftBlock baseline

Expected: Minecraft block/image picker with its built-in search box.

## F — minecraftItem native

Uses the documented shadow id:

```ts
//% item.shadow=minecraftItem
```

Check whether it renders, whether it has search, and which items it contains.

Suggested current Registry searches:

- `copper_spear`
- `copper_chest`
- `pale_oak_shelf`
- `resin_bricks`

A missing result means only that the MakeCode target catalog does not contain that value; it does not invalidate our own Registry.

## G — blockByName text

Uses `blocks.blockByName(name)` with a normal text input. Try `copper_spear` or another current code name.

This checks arbitrary-name representation only. It is not a searchable Registry UI.
