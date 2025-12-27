import createMapSourceAsComponent from '../../../components-factories/map-sources/createMapSourceAsComponent'
import type { VideoSourceProps } from './VideoSource.types'

/**
 * MapLibre Video map source and layers.
 * @props {@link VideoSourceProps}
 * @see {@link https://maplibre.org/maplibre-gl-js/docs/API/classes/VideoSource/ `MapLibre GL JS` docs}
 * @example
 * ```tsx
 * ```
 * @group Components – map sources
 */
const VideoSource = createMapSourceAsComponent<VideoSourceProps>()

export default VideoSource
