# Teleport Class — Period 2 (40 min) V1

## Welcome back

Period 2 adds direction, local coordinates, complex selectors, and safe teleporting.

- Learning 3: rotation and facing
- Advanced 1: local coordinates
- Advanced 2: marker selector
- Advanced 3: safe teleport

## Learning 3 — Rotation and facing (about 8 min)

Create `tp_turn`. Move 3 blocks and set the final rotation.

### ~ hint

```blocks
player.onChat("tp_turn", function () {
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

### ~

## Advanced 1 — Local coordinates (about 9 min)

Create `tp_forward`. Move 3 blocks in the direction you are facing.

Turn around and run it again.

### ~ hint

Local coordinates use `^`.

```blocks
player.onChat("tp_forward", function () {
    MCFunctionTeleport.toPosition(
        MCFunctionFields.self(
            MCFunctionFields.noSelectorCondition()
        ),
        MCFunctionPositionFields.local(
            0,
            0,
            3
        ),
        false
    )
})
```

### ~

## Advanced 2 — Marker selector (about 9 min)

Search for `armor_stand`.

Build a selector for one armor stand named `TP_MARK`.

Your teacher can prepare the marker before class.

### ~ hint

Combine type, name, and count conditions.

```blocks
let marker = MCFunctionFields.allEntities(
    MCFunctionFields.addEntityTypeCondition(
        MCFunctionEntityLibrary.armorStand(),
        false,
        MCFunctionFields.addTextCondition(
            MCFunctionFields.SelectorTextConditionType.Name,
            "TP_MARK",
            false,
            MCFunctionFields.addNumberCondition(
                MCFunctionFields.SelectorNumberConditionType.Count,
                1,
                MCFunctionFields.noSelectorCondition()
            )
        )
    )
)
```

### ~

## Advanced 3 — Safe teleport (about 8 min)

Create `tp_safe`.

Turn **check blocks** on and compare a clear destination with a blocked destination.

### ~ hint

When block checking is enabled, a blocked destination can prevent the teleport.

```blocks
player.onChat("tp_safe", function () {
    MCFunctionTeleport.toPosition(
        MCFunctionFields.self(
            MCFunctionFields.noSelectorCondition()
        ),
        MCFunctionPositionFields.relative(
            0,
            0,
            3
        ),
        true
    )
})
```

### ~

## Final challenge (about 6 min)

Choose one challenge.

1. Combine a selector condition with teleport.
2. Use local coordinates to build a short movement course.
3. Teleport to a prepared marker and face a target.
4. Explain when `check blocks = true` is useful.
