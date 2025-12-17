import createWebObjectAsComponent from '../../components-factory/createWebObjectAsComponent'
import type { MapProps, MapRef } from './Map.types'

/**
 * MapLibre Map view.
 * @see {@link https://maplibre.org/maplibre-gl-js/docs/API/classes/Map/ MapLibre GL JS docs}
 * @group Components
 */
const Map = createWebObjectAsComponent<MapRef, MapProps>('map')

export default Map
