import type {
  PopupListeners,
  PopupMethods,
  PopUpOptions,
} from 'react-native-maplibre-gl-js/react-native/components/Popup/Popup.types'
import createWebObjectAsComponent from 'react-native-maplibre-gl-js/react-native/components-factory/createWebObjectAsComponent'

const Popup = createWebObjectAsComponent<
  PopUpOptions,
  PopupMethods,
  PopupListeners
>('popup')

export default Popup
