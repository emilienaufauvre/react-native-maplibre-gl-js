import createWebObjectAsComponent from 'react-native-maplibre-gl-js/react-native/components-factory/createWebObjectAsComponent'
import type {
  MarkerProps,
  MarkerRef,
} from 'react-native-maplibre-gl-js/react-native/components/Marker/Marker.types'

/**
 * MapLibre Marker view.
 * @see {@link https://maplibre.org/maplibre-gl-js/docs/API/classes/Marker/ MapLibre GL JS docs}
 * @group Components
 */
const Marker = createWebObjectAsComponent<MarkerRef, MarkerProps>('marker')

export default Marker
