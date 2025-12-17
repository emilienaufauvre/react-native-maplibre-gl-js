/**
 * Public API of react-native-maplibre-gl-js.
 * @module Public API
 * @packageDocumentation
 */

import type { MapProviderProps } from './react-native/components/MapProvider/MapProvider.types'
import type { MapRef, MapProps } from './react-native/components/Map/Map.types'
import type {
  MarkerRef,
  MarkerProps,
} from './react-native/components/Marker/Marker.types'
import type {
  PopupRef,
  PopupProps,
} from './react-native/components/Popup/Popup.types'

export type { MapProviderProps }
export type { MapRef, MapProps }
export type { MarkerRef, MarkerProps }
export type { PopupRef, PopupProps }

import MapProvider from './react-native/components/MapProvider/MapProvider'
import Map from './react-native/components/Map/Map'
import Marker from './react-native/components/Marker/Marker'
import Popup from './react-native/components/Popup/Popup'

export { MapProvider, Map, Marker, Popup }
