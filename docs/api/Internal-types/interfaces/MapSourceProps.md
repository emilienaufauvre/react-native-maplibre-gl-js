[react-native-maplibre-gl-js](../../index.md) / [Internal types](../index.md) / MapSourceProps

# MapSourceProps\<SourceSpec\>

Defined in: [src/react-native/components-factories/map-sources/createMapSourceAsComponent.types.ts:44](https://github.com/emilienaufauvre/react-native-maplibre-gl-js/blob/main/src/react-native/components-factories/map-sources/createMapSourceAsComponent.types.ts#L44)

React Native props of a component (used to instantiate the map source and
layer(s) in the web world).

## Type Parameters

| Type Parameter |
| ------ |
| `SourceSpec` *extends* [`MapSourceClass`](../type-aliases/MapSourceClass.md) |

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="id"></a> `id` | `string` | The source identifier. It must be unique among all the sources of the map; otherwise, unexpected behaviors may occur. | [src/react-native/components-factories/map-sources/createMapSourceAsComponent.types.ts:49](https://github.com/emilienaufauvre/react-native-maplibre-gl-js/blob/main/src/react-native/components-factories/map-sources/createMapSourceAsComponent.types.ts#L49) |
| <a id="source"></a> `source` | `SourceSpec` | The source specification to be added to the map (as defined in the `MapLibre GL JS` documentation). | [src/react-native/components-factories/map-sources/createMapSourceAsComponent.types.ts:54](https://github.com/emilienaufauvre/react-native-maplibre-gl-js/blob/main/src/react-native/components-factories/map-sources/createMapSourceAsComponent.types.ts#L54) |
| <a id="layers"></a> `layers` | [`MapSourceLayer`](MapSourceLayer.md)[] | One or more layers to be added to the map. The layers are based on the current source. | [src/react-native/components-factories/map-sources/createMapSourceAsComponent.types.ts:59](https://github.com/emilienaufauvre/react-native-maplibre-gl-js/blob/main/src/react-native/components-factories/map-sources/createMapSourceAsComponent.types.ts#L59) |
