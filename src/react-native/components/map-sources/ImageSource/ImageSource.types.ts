import type { MapSourceProps } from '../../../components-factories/map-sources/createMapSourceAsComponent.types'
import type { ImageSourceSpecification } from 'maplibre-gl'

/**
 * Image source component props.
 * @interface
 * @group Types (map sources)
 */
export type ImageSourceProps = MapSourceProps<ImageSourceSpecification>
