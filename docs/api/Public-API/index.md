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

## Types (map provider)

| Type Alias | Description |
| ------ | ------ |
| [MapProviderProps](type-aliases/MapProviderProps.md) | MapProvider component props. |
| [WebMessageOptions](type-aliases/WebMessageOptions.md) | Options on how messages from the Web are buffered and dispatched to RN. |

## Types (web objects)

| Name | Description |
| ------ | ------ |
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

## Web object abstraction types

| Type Alias | Description |
| ------ | ------ |
| [WebObjectListenerOnRN](type-aliases/WebObjectListenerOnRN.md) | A listener on an event introduced by the React Native usage. |
| [WebObjectListenerOnObject](type-aliases/WebObjectListenerOnObject.md) | A listener to be set on an event emitted by the web object. |
| [WebObjectListenerOnMapLayer](type-aliases/WebObjectListenerOnMapLayer.md) | A listener to be set on an event emitted by the web object, but specific to a map layer. |
| [WebObjectListenerOnHTMLElement](type-aliases/WebObjectListenerOnHTMLElement.md) | A listener to be set on an event emitted by the HTMLElement associated with the web object. |

## Map source abstraction types

| Name | Description |
| ------ | ------ |
| [MapSourceId](type-aliases/MapSourceId.md) | UID of a map source in the web world. |
| [MapSourceLayerId](type-aliases/MapSourceLayerId.md) | UID of a map source layer in the web world. |
| [MapSourceLayer](interfaces/MapSourceLayer.md) | A layer specification that can be added to a map source. |
| [MapSourceLayerListeners](interfaces/MapSourceLayerListeners.md) | Listeners that can be set by a component on the corresponding map layer events. By default, the mount/unmount events are available (they are custom, added on top of the `MapLibre GL JS` events). |

## Hooks

| Function | Description |
| ------ | ------ |
| [useLocalImage](functions/useLocalImage.md) | Load a local image as base64 data URI and return it. It can then be used in HTML elements. |
