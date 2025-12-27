[react-native-maplibre-gl-js](../../index.md) / [Public API](../index.md) / VideoSourceProps

# VideoSourceProps

Defined in: [src/react-native/components/map-sources/VideoSource/VideoSource.types.ts:9](https://github.com/emilienaufauvre/react-native-maplibre-gl-js/blob/main/src/react-native/components/map-sources/VideoSource/VideoSource.types.ts#L9)

Video source component props.

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="id"></a> `id` | `string` | The source identifier. It must be unique among all the sources of the map; otherwise, unexpected behaviors may occur. | [src/react-native/components-factories/map-sources/createMapSourceAsComponent.types.ts:50](https://github.com/emilienaufauvre/react-native-maplibre-gl-js/blob/main/src/react-native/components-factories/map-sources/createMapSourceAsComponent.types.ts#L50) |
| <a id="source"></a> `source` | `VideoSourceSpecification` | The source specification to be added to the map (as defined in the `MapLibre GL JS` documentation). | [src/react-native/components-factories/map-sources/createMapSourceAsComponent.types.ts:55](https://github.com/emilienaufauvre/react-native-maplibre-gl-js/blob/main/src/react-native/components-factories/map-sources/createMapSourceAsComponent.types.ts#L55) |
| <a id="layers"></a> `layers` | [`MapSourceLayer`](../../Internal-types/interfaces/MapSourceLayer.md)[] | One or more layers to be added to the map. The layers are based on the current source. | [src/react-native/components-factories/map-sources/createMapSourceAsComponent.types.ts:60](https://github.com/emilienaufauvre/react-native-maplibre-gl-js/blob/main/src/react-native/components-factories/map-sources/createMapSourceAsComponent.types.ts#L60) |
