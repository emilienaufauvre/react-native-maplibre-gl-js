import createMapSourceAsComponent from '../../../components-factories/map-sources/createMapSourceAsComponent'
import type { RasterTileSourceProps } from './RasterTileSource.types'

/**
 * MapLibre Raster Tile map source and layers.
 * @props {@link RasterTileSourceProps}
 * @see {@link https://maplibre.org/maplibre-gl-js/docs/API/classes/RasterTileSource/ `MapLibre GL JS` docs}
 * @example
 * ```tsx
 * <RasterTileSource
 *   id={'raster-source'}
 *   // First, the Raster Tile source is declared.
 *   source={{
 *     type: 'raster',
 *     tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
 *   }}
 *   // Then, one or multiple layers that use this source are declared.
 *   // /!\ it is a list.
 *   layers={[
 *     // Add a layer that will overlay the map style.
 *     {
 *       layer: {
 *         id: 'raster-layer',
 *         type: 'raster',
 *         // No need to specify the source here, it will be added
 *         // automatically.
 *         //> i.e., this is not needed: source: 'raster-source'.
 *       },
 *       // Define listeners for this layer.
 *       listeners: {
 *         mount: () => console.log('Raster layer mounted'),
 *       },
 *     },
 *   ]}
 * />
 * ```
 * @group Components – map sources
 */
const RasterTileSource = createMapSourceAsComponent<RasterTileSourceProps>()

export default RasterTileSource
