import type { MapSourceProps } from '../../../components-factories/map-sources/createMapSourceAsComponent.types'
import type { VideoSourceSpecification } from 'maplibre-gl'

/**
 * Video source component props.
 * @interface
 * @group Types (map sources)
 */
export type VideoSourceProps = MapSourceProps<VideoSourceSpecification>
