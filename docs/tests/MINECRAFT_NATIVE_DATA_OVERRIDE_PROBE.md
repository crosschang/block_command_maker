# Minecraft Native Data Override Probe

This is an isolated experiment after the native Block/Item picker probe.

## H — minecraftBlock + shadowOptions.data

The annotation is:

```ts
//% block.shadow=minecraftBlock
//% block.shadowOptions.data='[["MCF_TEST_ALPHA",1],["MCF_TEST_BETA",2],["MCF_TEST_GAMMA",3]]'
```

`data` is a documented PXT field-editor option. This test asks a narrower question: does the Minecraft target-owned `minecraftBlock` shadow actually consume external `data` supplied by an Extension?

### Outcomes

- Native Minecraft catalog unchanged: data injection is ignored/not supported by this picker.
- MCF_TEST_ALPHA/BETA/GAMMA appear or replace the list: target picker accepts extension-provided data; investigate this path further.
- Category/block fails to render: option is incompatible with this target shadow; do not use it in product code.
