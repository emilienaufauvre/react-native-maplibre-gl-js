import {
  type Event,
  type Popup as MapLibrePopup,
  type PopupOptions as MapLibrePopupOptions,
} from 'maplibre-gl'
import type {
  InferWebObjectMethods,
  InferWebObjectOptions,
  WebObjectListenerOnObject,
  WebObjectListenerOnRN,
} from 'react-native-maplibre-gl-js/react-native/components-factory/createWebObjectAsComponent.types'

export type PopUpOptions = InferWebObjectOptions<MapLibrePopupOptions>

export type PopupMethods = InferWebObjectMethods<
  MapLibrePopup,
  {
    addTo: () => Promise<void>
    setEventedParent: (parentId: string) => Promise<void>
  }
>

export type PopupListeners = {
  // React native events.
  mount?: WebObjectListenerOnRN<void>
  umount?: WebObjectListenerOnRN<void>
  // MapLibre GL JS events.
  // https://maplibre.org/maplibre-gl-js/docs/API/classes/Popup/#events
  open?: WebObjectListenerOnObject<Event>
  close?: WebObjectListenerOnObject<Event>
}
