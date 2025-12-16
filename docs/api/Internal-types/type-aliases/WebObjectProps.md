[**react-native-maplibre-gl-js**](../../index.md)

***

[react-native-maplibre-gl-js](../../index.md) / [Internal types](../index.md) / WebObjectProps

# Type Alias: WebObjectProps\<Options, Listeners\>

> **WebObjectProps**\<`Options`, `Listeners`\> = \{ `options?`: `Partial`\<`Options`\>; `listeners?`: `Partial`\<`Listeners`\>; \}

Defined in: [react-native/components-factory/createWebObjectAsComponent.types.ts:30](https://github.com/emilienaufauvre/react-native-maplibre-gl-js/blob/e25cd1b6bd1f4ab67ba76836e1eb8134522e2f16/src/react-native/components-factory/createWebObjectAsComponent.types.ts#L30)

React Native props of a component (used to instantiate the web object in the
web world).

## Type Parameters

| Type Parameter |
| ------ |
| `Options` *extends* [`WebObjectOptionsInferred`](WebObjectOptionsInferred.md)\<`any`\> |
| `Listeners` *extends* [`WebObjectListeners`](WebObjectListeners.md) |

## Properties

### options?

> `optional` **options**: `Partial`\<`Options`\>

Defined in: [react-native/components-factory/createWebObjectAsComponent.types.ts:37](https://github.com/emilienaufauvre/react-native-maplibre-gl-js/blob/e25cd1b6bd1f4ab67ba76836e1eb8134522e2f16/src/react-native/components-factory/createWebObjectAsComponent.types.ts#L37)

The MapLibreGL JS options used to mount the web object.

***

### listeners?

> `optional` **listeners**: `Partial`\<`Listeners`\>

Defined in: [react-native/components-factory/createWebObjectAsComponent.types.ts:41](https://github.com/emilienaufauvre/react-native-maplibre-gl-js/blob/e25cd1b6bd1f4ab67ba76836e1eb8134522e2f16/src/react-native/components-factory/createWebObjectAsComponent.types.ts#L41)

The listeners to be set on the web object events.
