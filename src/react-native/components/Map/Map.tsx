import createWebObjectAsComponent from '@ml/react-native/components-factory/createWebObjectAsComponent'
import type {
  MapRef,
  MapProps,
} from '@ml/react-native/components/Map/Map.types'

/**
 * MapLibre Map view.
 * @see {@link https://maplibre.org/maplibre-gl-js/docs/API/classes/Map/ MapLibre GL JS docs}
 * @group Components
 */
const Map = createWebObjectAsComponent<MapRef, MapProps>('map')

export default Map
