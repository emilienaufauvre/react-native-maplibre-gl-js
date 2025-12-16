import {
  type Event,
  type Popup as MapLibrePopup,
  type PopupOptions as MapLibrePopupOptions,
} from 'maplibre-gl'
import type {
  WebObjectMethodsInferred,
  WebObjectOptionsInferred,
  WebObjectListenerOnObject,
  WebObjectListenerOnRN,
  WebObjectProps,
  WebObjectRef,
} from '@ml/react-native/components-factory/createWebObjectAsComponent.types'

/**
 * TODO
 * @group Types
 */
export type PopupRef = WebObjectRef<PopupMethods>

/**
 * TODO
 * @group Types
 */
export type PopupProps = WebObjectProps<PopUpOptions, PopupListeners>

type PopupMethods = WebObjectMethodsInferred<
  MapLibrePopup,
  {
    addTo: () => Promise<void>
    setEventedParent: (parentId: string) => Promise<void>
  }
>
type PopUpOptions = WebObjectOptionsInferred<MapLibrePopupOptions>
type PopupListeners = {
  // React native events.
  mount: WebObjectListenerOnRN<void>
  unmount: WebObjectListenerOnRN<void>
  // MapLibre GL JS events.
  // https://maplibre.org/maplibre-gl-js/docs/API/classes/Popup/#events
  open: WebObjectListenerOnObject<Event>
  close: WebObjectListenerOnObject<Event>
}
