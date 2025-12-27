[react-native-maplibre-gl-js](../../index.md) / [Public API](../index.md) / VectorTileSourceProps

# VectorTileSourceProps

Defined in: [src/react-native/components/map-sources/VectorTileSource/VectorTileSource.types.ts:9](https://github.com/emilienaufauvre/react-native-maplibre-gl-js/blob/main/src/react-native/components/map-sources/VectorTileSource/VectorTileSource.types.ts#L9)

VectorTileSource component props.

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="id"></a> `id` | `string` | The source identifier. It must be unique among all the sources of the map; otherwise, unexpected behaviors may occur. | [src/react-native/components-factories/map-sources/createMapSourceAsComponent.types.ts:51](https://github.com/emilienaufauvre/react-native-maplibre-gl-js/blob/main/src/react-native/components-factories/map-sources/createMapSourceAsComponent.types.ts#L51) |
| <a id="source"></a> `source` | `VectorSourceSpecification` | The source specification to be added to the map (as defined in the `MapLibre GL JS` documentation). | [src/react-native/components-factories/map-sources/createMapSourceAsComponent.types.ts:56](https://github.com/emilienaufauvre/react-native-maplibre-gl-js/blob/main/src/react-native/components-factories/map-sources/createMapSourceAsComponent.types.ts#L56) |
| <a id="layers"></a> `layers` | [`MapSourceLayer`](../../Internal-types/interfaces/MapSourceLayer.md)[] | One or more layers to be added to the map. The layers are based on the current source. | [src/react-native/components-factories/map-sources/createMapSourceAsComponent.types.ts:61](https://github.com/emilienaufauvre/react-native-maplibre-gl-js/blob/main/src/react-native/components-factories/map-sources/createMapSourceAsComponent.types.ts#L61) |
