/**
 * Public API of `react-native-maplibre-gl-js`.
 * @module Public API
 * @packageDocumentation
 * @sortStrategy sort-order
 */

// @group Types
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

// @group Components
export { default as MapProvider } from './react-native/components/core/MapProvider/MapProvider'
export { default as Map } from './react-native/components/web-objects/Map/Map'
export { default as Marker } from './react-native/components/web-objects/Marker/Marker'
export { default as Popup } from './react-native/components/web-objects/Popup/Popup'
