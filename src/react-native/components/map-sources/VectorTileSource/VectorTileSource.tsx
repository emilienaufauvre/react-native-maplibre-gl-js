import createMapSourceAsComponent from '../../../components-factories/map-sources/createMapSourceAsComponent'
import type { VectorTileSourceProps } from './VectorTileSource.types'

/**
 * MapLibre Vector Tile map source and layers.
 * @props {@link VectorTileSourceProps}
 * @see {@link https://maplibre.org/maplibre-gl-js/docs/API/classes/VectorTileSource/ `MapLibre GL JS` docs}
 * @example
 * ```tsx
 * ```
 * @group Components – map sources
 */
const VectorTileSource = createMapSourceAsComponent<VectorTileSourceProps>()

export default VectorTileSource
