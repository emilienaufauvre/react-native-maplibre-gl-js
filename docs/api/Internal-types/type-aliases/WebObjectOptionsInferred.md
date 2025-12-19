[react-native-maplibre-gl-js](../../index.md) / [Internal types](../index.md) / WebObjectOptionsInferred

# WebObjectOptionsInferred\<WebObjectOptions, ReplacedOptions, RemovedOptions\>

> **WebObjectOptionsInferred**\<`WebObjectOptions`, `ReplacedOptions`, `RemovedOptions`\> = `Omit`\<`Omit`\<`WebObjectOptions`, keyof `ReplacedOptions`\> & `ReplacedOptions`, `RemovedOptions`\>

Defined in: [src/react-native/components-factory/createWebObjectAsComponent.types.ts:129](https://github.com/emilienaufauvre/react-native-maplibre-gl-js/blob/main/src/react-native/components-factory/createWebObjectAsComponent.types.ts#L129)

Options that are used to instantiate a web object.
Filter out those options that cannot be set from the RN world and replace
them with the given replacements (e.g., HTMLElement that cannot be
instantiated in RN is replaced by HTMLElementDescriptor). Also, remove the
ones that should not be specified and used.

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `WebObjectOptions` | - |
| `ReplacedOptions` *extends* `Partial`\<`Record`\<keyof `WebObjectOptions`, `any`\>\> | \{ \} |
| `RemovedOptions` *extends* `Partial`\<keyof `WebObjectOptions`\> | `never` |
