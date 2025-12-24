[react-native-maplibre-gl-js](../../index.md) / [Public API](../index.md) / GeoJSONSourceProps

# GeoJSONSourceProps

Defined in: [src/react-native/components/map-sources/GeoJSONSource/GeoJSONSource.types.ts:9](https://github.com/emilienaufauvre/react-native-maplibre-gl-js/blob/main/src/react-native/components/map-sources/GeoJSONSource/GeoJSONSource.types.ts#L9)

GeoJSONSource component props.

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="id"></a> `id` | `string` | The source identifier. It must be unique among all the sources of the map; otherwise, unexpected behaviors may occur. | [src/react-native/components-factories/map-sources/createMapSourceAsComponent.types.ts:47](https://github.com/emilienaufauvre/react-native-maplibre-gl-js/blob/main/src/react-native/components-factories/map-sources/createMapSourceAsComponent.types.ts#L47) |
| <a id="source"></a> `source` | `GeoJSONSourceSpecification` | The source specification to be added to the map (as defined in the `MapLibre GL JS` documentation). | [src/react-native/components-factories/map-sources/createMapSourceAsComponent.types.ts:52](https://github.com/emilienaufauvre/react-native-maplibre-gl-js/blob/main/src/react-native/components-factories/map-sources/createMapSourceAsComponent.types.ts#L52) |
| <a id="layers"></a> `layers` | [`MapSourceLayer`](../../Internal-types/interfaces/MapSourceLayer.md)[] | One or more layers to be added to the map. The layers are based on the current source. | [src/react-native/components-factories/map-sources/createMapSourceAsComponent.types.ts:57](https://github.com/emilienaufauvre/react-native-maplibre-gl-js/blob/main/src/react-native/components-factories/map-sources/createMapSourceAsComponent.types.ts#L57) |
