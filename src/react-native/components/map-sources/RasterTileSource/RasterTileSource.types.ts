import type { MapSourceProps } from '../../../components-factories/map-sources/createMapSourceAsComponent.types'
import type { RasterSourceSpecification } from 'maplibre-gl'

/**
 * RasterTileSource component props.
 * @interface
 * @group Types (map sources)
 */
export type RasterTileSourceProps = MapSourceProps<RasterSourceSpecification>
