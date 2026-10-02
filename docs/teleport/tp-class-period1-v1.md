# Teleport Class — Period 1 (40 min) V1

## Welcome

Today we learn teleport in four short missions.

- Basic 1: absolute coordinates
- Basic 2: relative coordinates
- Learning 1: selector + entity search
- Learning 2: teleport to another target

Open a hint only when you need the block shape.

## Basic 1 — Absolute coordinates (about 8 min)

Create a chat command named `tp_abs` and move yourself to a fixed position chosen by your teacher.

### ~ hint

Use the **teleport to position** block with an **absolute position**.

```blocks
player.onChat("tp_abs", function () {
    MCFunctionTeleport.toPosition(
        MCFunctionFields.self(
            MCFunctionFields.noSelectorCondition()
        ),
        MCFunctionPositionFields.absolute(
            0,
            70,
            0
        ),
        false
    )
})
```

### ~

## Basic 2 — Relative coordinates (about 8 min)

Create `tp_up`. Move yourself 5 blocks upward from your current position.

### ~ hint

`~` means the current position is the reference.

```blocks
player.onChat("tp_up", function () {
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

### ~

## Learning 1 — Find an entity and use type (about 9 min)

Search the Toolbox for `zombie`.

Insert `entity minecraft:zombie` into the selector `type` condition.

### ~ hint

The Registry search block is an Entity value. Put it directly into `type`.

```blocks
let zombieTarget = MCFunctionFields.allEntities(
    MCFunctionFields.addEntityTypeCondition(
        MCFunctionFields.entityRegistryZombie(),
        false,
        MCFunctionFields.noSelectorCondition()
    )
)
```

```ghost
MCFunctionFields.entityRegistryZombie()
MCFunctionFields.entityRegistryArmorStand()
```

### ~

## Learning 2 — Teleport to another target (about 9 min)

Create `tp_friend`. Teleport yourself to the nearest player.

### ~ hint

The moving target and the destination are both selectors.

```blocks
player.onChat("tp_friend", function () {
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

### ~

## Wrap-up (about 6 min)

Try these questions:

1. What is the difference between absolute and relative coordinates?
2. What does `@s` mean?
3. Search for `armor_stand`. Can you place the result in `type`?
4. Run one command again and explain what each part does.
