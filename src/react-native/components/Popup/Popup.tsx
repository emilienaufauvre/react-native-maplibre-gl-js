import createWebObjectAsComponent from '../../components-factory/createWebObjectAsComponent'
import type { PopupProps, PopupRef } from './Popup.types'

/**
 * MapLibre Popup view.
 * @see {@link https://maplibre.org/maplibre-gl-js/docs/API/classes/Popup/ MapLibre GL JS docs}
 * @group Components
 */
const Popup = createWebObjectAsComponent<PopupRef, PopupProps>('popup')

export default Popup
