# TP + Registry Search Smoke Test

### @explicitHints true

## Introduction @showdialog

This is a **diagnostic tutorial**, not a classroom lesson.

Use it to verify that the extension release can:

1. render custom blocks in tutorial hints,
2. expose Registry entity blocks to MakeCode search,
3. convert the TP JavaScript snippets to Blocks,
4. keep the TP blocks usable after switching between JavaScript and Blocks.

If any step fails, stop here and fix the tutorial pattern before copying it into the real course files.

## Step 1 — Entity search

Use the MakeCode Toolbox search and type:

`zombie`

Confirm that Registry value blocks containing `minecraft:zombie` appear.

Also try:

`armor_stand`

The search result is an `EntityValue` reporter block that can be inserted into the selector `type` condition.

```blocks
let target = MCFunctionFields.allEntities(
    MCFunctionFields.addEntityTypeCondition(
        MCFunctionFields.entityRegistryZombie(),
        false,
        MCFunctionFields.noSelectorCondition()
    )
)
```

```ghost
MCFunctionFields.entityRegistryZombie()
MCFunctionFields.entityRegistryZombieHorse()
MCFunctionFields.entityRegistryZombieVillager()
MCFunctionFields.entityRegistryArmorStand()
MCFunctionFields.entity("my_pack:custom_entity")
```

## Step 2 — Basic relative TP

Create the `tp_test` chat command.

When you type `tp_test` in Minecraft, the player should move 5 blocks upward.

```blocks
player.onChat("tp_test", function () {
    MCFunctionTeleport.toPosition(
        MCFunctionFields.self(
            MCFunctionFields.noSelectorCondition()
        ),
        MCFunctionPositionFields.relative(
            0,
            5,
            0
        ),
        false
    )
})
```

## Step 3 — TP to another entity

Check that the destination selector renders correctly.

This step is mainly checking tutorial block rendering and JavaScript-to-Blocks conversion.

```blocks
player.onChat("tp_entity_test", function () {
    MCFunctionTeleport.toEntity(
        MCFunctionFields.self(
            MCFunctionFields.noSelectorCondition()
        ),
        MCFunctionFields.nearestPlayer(
            MCFunctionFields.noSelectorCondition()
        ),
        false
    )
})
```

## Step 4 — Rotation

Check that the rotation value block appears inside the TP block.

```blocks
player.onChat("tp_rotation_test", function () {
    MCFunctionTeleport.withRotation(
        MCFunctionFields.self(
            MCFunctionFields.noSelectorCondition()
        ),
        MCFunctionPositionFields.relative(
            0,
            0,
            3
        ),
        MCFunctionRotationFields.absolute(
            180,
            0
        ),
        false
    )
})
```

## Step 5 — Facing position

Check that two Position values render independently: destination and facing position.

```blocks
player.onChat("tp_facing_test", function () {
    MCFunctionTeleport.facingPosition(
        MCFunctionFields.self(
            MCFunctionFields.noSelectorCondition()
        ),
        MCFunctionPositionFields.relative(
            0,
            0,
            3
        ),
        MCFunctionPositionFields.relative(
            0,
            0,
            0
        ),
        false
    )
})
```

## Step 6 — Round-trip check

Before promoting this tutorial pattern to the real course:

1. Switch from **Blocks → JavaScript**.
2. Confirm the TP code is generated without grey/unknown blocks.
3. Switch **JavaScript → Blocks**.
4. Confirm the same TP structure returns.
5. Run `tp_test` in Minecraft Education.

PASS criteria:

- tutorial opens,
- every hint renders,
- `zombie` and `armor_stand` are searchable,
- TP blocks survive Blocks ↔ JavaScript,
- `tp_test` executes in Minecraft Education.

Do not copy this tutorial into Basic/Learning/Advanced course files until all five checks pass.
