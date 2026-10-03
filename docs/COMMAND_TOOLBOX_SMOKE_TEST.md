# MCFunction Command Toolbox Smoke Test

## Goal

Verify that executable command blocks are shown under one `MCFunction Command`
category while reusable value/field blocks remain in their own categories.

## Expected toolbox

```text
MCFunction Command
  Give
    give
    give advanced
  Teleport
    teleport to position
    teleport to entity
    teleport with rotation
    teleport facing position
    teleport facing entity
```

There should be no separate visible `MCFunction TP` or `MCFunction Give` category.

## Compatibility

- Existing JavaScript calls to `MCFunctionTeleport.*` remain available through hidden wrappers.
- Existing TP block IDs are preserved.
- Legacy Give test blocks in `MCFunctionTest` remain hidden for compatibility.
