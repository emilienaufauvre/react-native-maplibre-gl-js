import type {
  MapListeners,
  MapMethods,
  MapOptions,
} from 'react-native-maplibre-gl-js/react-native/components/Map/Map.types'
import createWebObjectAsComponent from 'react-native-maplibre-gl-js/react-native/components-factory/createWebObjectAsComponent'

const Map = createWebObjectAsComponent<MapOptions, MapMethods, MapListeners>(
  'map',
)

export default Map
