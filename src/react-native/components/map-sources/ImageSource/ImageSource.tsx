import createMapSourceAsComponent from '../../../components-factories/map-sources/createMapSourceAsComponent'
import type { ImageSourceProps } from './ImageSource.types'

/**
 * MapLibre Image map source and layers.
 * @props {@link ImageSourceProps}
 * @see {@link https://maplibre.org/maplibre-gl-js/docs/API/classes/ImageSource/ `MapLibre GL JS` docs}
 * @example
 * ```tsx
 * ```
 * @group Components – map sources
 */
const ImageSource = createMapSourceAsComponent<ImageSourceProps>()

export default ImageSource
