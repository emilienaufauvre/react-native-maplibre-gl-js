import createMapSourceAsComponent from '../../../components-factories/map-sources/createMapSourceAsComponent'
import type { VideoSourceProps } from './VideoSource.types'

/**
 * MapLibre Video map source and layers.
 * @props {@link VideoSourceProps}
 * @see {@link https://maplibre.org/maplibre-gl-js/docs/API/classes/VideoSource/ `MapLibre GL JS` docs}
 * @example
 * ```tsx
 * <VideoSource
 *   id={'video-source'}
 *   // First, the Video source is declared.
 *   source={{
 *     type: 'video',
 *     urls: ['https://static-assets.mapbox.com/mapbox-gl-js/drone.mp4'],
 *     coordinates: [
 *       [2.315984383759419, 48.87044351904299],
 *       [2.3517090282194317, 48.87044297931527],
 *       [2.351833890385791, 48.85134902326752],
 *       [2.3157573781646386, 48.85135618849253],
 *     ],
 *   }}
 *   // Then, one or multiple layers that use this source are declared.
 *   // /!\ it is a list.
 *   layers={[
 *     // Add a layer that will be the image itself.
 *     {
 *       layer: {
 *         id: 'video-layer',
 *         type: 'raster',
 *         // No need to specify the source here, it will be added
 *         // automatically.
 *         //> i.e., this is not needed: source: 'video-source'.
 *       },
 *       // Define listeners for this layer. This layer does not expose
 *       // features. Therefore, interactive listeners are never triggered.
 *       listeners: {
 *         mount: () => console.log('Video layer mounted'),
 *       },
 *     },
 *   ]}
 * />
 * ```
 * @group Components – map sources
 */
const VideoSource = createMapSourceAsComponent<VideoSourceProps>()

export default VideoSource
