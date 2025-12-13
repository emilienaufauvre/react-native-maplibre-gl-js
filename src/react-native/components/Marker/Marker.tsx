import type {
  MarkerListeners,
  MarkerOptions,
  MarkerMethods,
} from 'react-native-maplibre-gl-js/react-native/components/Marker/Marker.types'
import createWebObjectAsComponent from 'react-native-maplibre-gl-js/react-native/components-factory/createWebObjectAsComponent'

const Marker = createWebObjectAsComponent<
  MarkerOptions,
  MarkerMethods,
  MarkerListeners
>('marker')

export default Marker
