import {
  MAP_METHODS_THAT_CONTAINS_HTML_ELEMENTS,
  MAP_OPTIONS_THAT_ARE_HTML_ELEMENTS,
  type MapProps,
  type MapRef,
} from './Map.types'
import createWebObjectAsComponent from '../../../components-factories/web-objects/createWebObjectAsComponent'

/**
 * MapLibre Map view.
 * @props {@link MapProps}
 * @ref {@link MapRef}
 * @see {@link https://maplibre.org/maplibre-gl-js/docs/API/classes/Map/ `MapLibre GL JS` docs}
 * @example
 * ```tsx
 * <Map
 *   options={{
 *     style: 'https://tiles.openfreemap.org/styles/liberty',
 *     center: [2.32, 48.86],
 *     zoom: 12,
 *   }}
 *   listeners={{
 *     mount: {
 *       rnListener: () => console.log('Map mounted'),
 *     },
 *     unmount: {
 *       rnListener: () => console.log('Map unmounted'),
 *     },
 *     click: {
 *       objectListener: (event: MapMouseEvent) =>
 *         console.log('Map clicked', event),
 *     },
 *     rotatestart: {
 *       objectListener: (
 *         event: MapLibreEvent<MouseEvent | TouchEvent | undefined>,
 *       ) => console.log('Map rotation started', event),
 *     },
 *   }}
 * />
 * ```
 * @group Components – web objects
 */
const Map = createWebObjectAsComponent<MapRef, MapProps>(
  'map',
  MAP_OPTIONS_THAT_ARE_HTML_ELEMENTS,
  MAP_METHODS_THAT_CONTAINS_HTML_ELEMENTS,
)

export default Map
