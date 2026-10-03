# Item Image POC

## Goal

Check whether the Minecraft target's native `minecraftItem` shadow renders an item image inside an MCFunction reporter block and whether the image is also visible in Toolbox Search results.

This POC does **not** change AST / Parser / Compiler / Registry semantics.

## Test

1. Load the extension in Minecraft Education 26.32 / MakeCode.
2. Open `MCFunction Item Image POC`.
3. Confirm that the ten reporter blocks render an item image next to the text.
4. Use Toolbox Search and search for:
   - `diamond_sword`
   - `apple`
   - `trident`
5. Confirm whether the image is visible in search results.
6. Drag a block into the workspace and confirm the image remains visible.
7. Switch Blocks -> JavaScript -> Blocks and confirm the reporter block returns without corruption.

## Interpretation

- PASS-A: image is visible in category + search + workspace.
  - Native shadow rendering can be used as a visual UX primitive.
- PASS-B: image is visible only after placing the block.
  - Useful for workspace readability, but not enough for search UX.
- FAIL: no image or toolbox/category breaks.
  - Remove this POC and keep text reporter search.

## Limitation

`minecraftItem` uses the Minecraft MakeCode target's own catalog. It is already known that this catalog can lag behind current Bedrock/Education Registry data. Therefore this POC tests **rendering only**, not the final Registry data source.
