import type {
  PopupProps,
  PopupRef,
} from '@ml/react-native/components/Popup/Popup.types'
import createWebObjectAsComponent from '@ml/react-native/components-factory/createWebObjectAsComponent'

/**
 * MapLibre Popup view.
 * @see {@link https://maplibre.org/maplibre-gl-js/docs/API/classes/Popup/ MapLibre GL JS docs}
 * @group Components
 */
const Popup = createWebObjectAsComponent<PopupRef, PopupProps>('popup')

export default Popup
