import createMapSourceAsComponent from '../../../components-factories/map-sources/createMapSourceAsComponent'
import type { RasterTileSourceProps } from './RasterTileSource.types'

/**
 * MapLibre Raster Tile map source and layers.
 * @props {@link RasterTileSourceProps}
 * @see {@link https://maplibre.org/maplibre-gl-js/docs/API/classes/RasterTileSource/ `MapLibre GL JS` docs}
 * @example
 * ```tsx
 * ```
 * @group Components – map sources
 */
const RasterTileSource = createMapSourceAsComponent<RasterTileSourceProps>()

export default RasterTileSource
