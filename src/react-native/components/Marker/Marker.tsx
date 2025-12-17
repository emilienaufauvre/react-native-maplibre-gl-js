import createWebObjectAsComponent from '../../components-factory/createWebObjectAsComponent'
import type { MarkerProps, MarkerRef } from './Marker.types'

/**
 * MapLibre Marker view.
 * @see {@link https://maplibre.org/maplibre-gl-js/docs/API/classes/Marker/ MapLibre GL JS docs}
 * @group Components
 */
const Marker = createWebObjectAsComponent<MarkerRef, MarkerProps>('marker')

export default Marker
