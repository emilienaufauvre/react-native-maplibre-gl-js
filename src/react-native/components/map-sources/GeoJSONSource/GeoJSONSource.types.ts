import type { GeoJSONSourceSpecification } from '@maplibre/maplibre-gl-style-spec'
import type { MapSourceProps } from '../../../components-factories/map-sources/createMapSourceAsComponent.types'

/**
 * GeoJSONSource component props.
 * @group Types (map sources)
 */
export type GeoJSONSourceProps = MapSourceProps<GeoJSONSourceSpecification>
