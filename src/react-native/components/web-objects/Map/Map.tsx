import type { MapProps, MapRef } from './Map.types'
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
 * @group Components
 */
const Map = createWebObjectAsComponent<MapRef, MapProps>('map')

export default Map
