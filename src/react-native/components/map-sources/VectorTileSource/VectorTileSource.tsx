import createMapSourceAsComponent from '../../../components-factories/map-sources/createMapSourceAsComponent'
import type { VectorTileSourceProps } from './VectorTileSource.types'

/**
 * MapLibre Vector Tile map source and layers.
 * @props {@link VectorTileSourceProps}
 * @see {@link https://maplibre.org/maplibre-gl-js/docs/API/classes/VectorTileSource/ `MapLibre GL JS` docs}
 * @example
 * ```tsx
 * <VectorTileSource
 *   id={'vector-source'}
 *   // First, the Vector Tile source is declared.
 *   source={{
 *     type: 'vector',
 *     tiles: ['https://tiles.openfreemap.org/planet/v3/{z}/{x}/{y}.pbf'],
 *   }}
 *   // Then, one or multiple layers that use this source are declared.
 *   // /!\ it is a list.
 *   layers={[
 *     // Add a layer that will highlight the routes.
 *     {
 *       layer: {
 *         id: 'roads',
 *         type: 'line',
 *         'source-layer': 'transportation',
 *         paint: {
 *           'line-color': 'red',
 *           'line-width': 1,
 *         },
 *         // No need to specify the source here, it will be added
 *         // automatically.
 *         //> i.e., this is not needed: source: 'vector-source'.
 *       },
 *       // Define listeners for this layer.
 *       listeners: {
 *         mount: () => console.log('Vector layer mounted'),
 *       },
 *     },
 *   ]}
 * />
 * ```
 * @group Components – map sources
 */
const VectorTileSource = createMapSourceAsComponent<VectorTileSourceProps>()

export default VectorTileSource
