[react-native-maplibre-gl-js](../index.md) / Public API

# Public API

Public API of `react-native-maplibre-gl-js`.

## Components – core

| Function | Description |
| ------ | ------ |
| [MapProvider](functions/MapProvider.md) | Must be used as a parent component to allow instantiation of map elements. Every child must be a direct component. This is the bridge to the web world / the `MapLibre GL JS` library. |

## Components – web objects

| Variable | Description |
| ------ | ------ |
| [Map](variables/Map.md) | MapLibre Map view. |
| [Marker](variables/Marker.md) | MapLibre Marker view. |
| [Popup](variables/Popup.md) | MapLibre Popup view. |

## Components – map sources

| Variable | Description |
| ------ | ------ |
| [GeoJSONSource](variables/GeoJSONSource.md) | MapLibre GeoJSON map source and layers. |
| [ImageSource](variables/ImageSource.md) | MapLibre Image map source and layers. |
| [VideoSource](variables/VideoSource.md) | MapLibre Video map source and layers. |
| [VectorTileSource](variables/VectorTileSource.md) | MapLibre Vector Tile map source and layers. |
| [RasterTileSource](variables/RasterTileSource.md) | MapLibre Raster Tile map source and layers. |

## Types (web objects)

| Name | Description |
| ------ | ------ |
| [MapProviderProps](interfaces/MapProviderProps.md) | MapProvider component props. |
| [WebMessageOptions](interfaces/WebMessageOptions.md) | Options on how messages from the Web are buffered and dispatched to RN. |
| [MapRef](interfaces/MapRef.md) | Map component ref. |
| [MapProps](type-aliases/MapProps.md) | Map component props. |
| [MarkerRef](interfaces/MarkerRef.md) | Marker component ref. |
| [MarkerProps](interfaces/MarkerProps.md) | Marker component props. |
| [PopupRef](interfaces/PopupRef.md) | Popup component ref. |
| [PopupProps](interfaces/PopupProps.md) | Popup component props. |

## Types (map sources)

| Interface | Description |
| ------ | ------ |
| [GeoJSONSourceProps](interfaces/GeoJSONSourceProps.md) | GeoJSONSource component props. |
| [ImageSourceProps](interfaces/ImageSourceProps.md) | ImageSource component props. |
| [VideoSourceProps](interfaces/VideoSourceProps.md) | VideoSource component props. |
| [VectorTileSourceProps](interfaces/VectorTileSourceProps.md) | VectorTileSource component props. |
| [RasterTileSourceProps](interfaces/RasterTileSourceProps.md) | RasterTileSource component props. |

## Hooks

| Function | Description |
| ------ | ------ |
| [useLocalImage](functions/useLocalImage.md) | Load a local image as base64 data URI, and return it. It can then be used in HTML elements. |
