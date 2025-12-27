import type { MapSourceProps } from '../../../components-factories/map-sources/createMapSourceAsComponent.types'
import type { VectorSourceSpecification } from 'maplibre-gl'

/**
 * VectorTileSource component props.
 * @interface
 * @group Types (map sources)
 */
export type VectorTileSourceProps = MapSourceProps<VectorSourceSpecification>
