import type { GeoJSONSourceProps } from './GeoJSONSource.types'
import createMapSourceAsComponent from '../../../components-factories/map-sources/createMapSourceAsComponent'

/**
 * MapLibre GeoJSONSource view.
 * @props {@link GeoJSONSourceProps}
 * @see {@link https://maplibre.org/maplibre-gl-js/docs/API/classes/GeoJSONSource/ `MapLibre GL JS` docs}
 * @example
 * ```tsx
 * ```
 * @group Components
 */
const GeoJSONSource = createMapSourceAsComponent<GeoJSONSourceProps>()

export default GeoJSONSource
