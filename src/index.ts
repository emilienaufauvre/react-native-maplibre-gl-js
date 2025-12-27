/**
 * Public API of `react-native-maplibre-gl-js`.
 * @module Public API
 * @packageDocumentation
 * @sortStrategy sort-order
 */

// @group Types (web objects)
export type { MapProviderProps } from './react-native/components/core/MapProvider/MapProvider.types'
export type {
  MapRef,
  MapProps,
} from './react-native/components/web-objects/Map/Map.types'
export type {
  MarkerRef,
  MarkerProps,
} from './react-native/components/web-objects/Marker/Marker.types'
export type {
  PopupRef,
  PopupProps,
} from './react-native/components/web-objects/Popup/Popup.types'

// @group Types (map sources)
export type { GeoJSONSourceProps } from './react-native/components/map-sources/GeoJSONSource/GeoJSONSource.types'
export type { ImageSourceProps } from './react-native/components/map-sources/ImageSource/ImageSource.types'
export type { VideoSourceProps } from './react-native/components/map-sources/VideoSource/VideoSource.types'
export type { VectorTileSourceProps } from './react-native/components/map-sources/VectorTileSource/VectorTileSource.types'
export type { RasterTileSourceProps } from './react-native/components/map-sources/RasterTileSource/RasterTileSource.types'

// @group Components – core
export { default as MapProvider } from './react-native/components/core/MapProvider/MapProvider'

// @group Components – web objects
export { default as Map } from './react-native/components/web-objects/Map/Map'
export { default as Marker } from './react-native/components/web-objects/Marker/Marker'
export { default as Popup } from './react-native/components/web-objects/Popup/Popup'

// @group Components – map sources
export { default as GeoJSONSource } from './react-native/components/map-sources/GeoJSONSource/GeoJSONSource'
export { default as ImageSource } from './react-native/components/map-sources/ImageSource/ImageSource'
export { default as VideoSource } from './react-native/components/map-sources/VideoSource/VideoSource'
export { default as VectorTileSource } from './react-native/components/map-sources/VectorTileSource/VectorTileSource'
export { default as RasterTileSource } from './react-native/components/map-sources/RasterTileSource/RasterTileSource'
