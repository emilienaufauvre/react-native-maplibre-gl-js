import {
  type Event,
  type Marker as MapLibreMarker,
  type MarkerOptions as MapLibreMarkerOptions,
} from 'maplibre-gl'
import type { HTMLElementDescriptor } from 'react-native-maplibre-gl-js/communication/messages.types'
import type {
  InferWebObjectMethods,
  InferWebObjectOptions,
  WebObjectListenerOnHTMLElement,
  WebObjectListenerOnObject,
  WebObjectListenerOnRN,
} from 'react-native-maplibre-gl-js/react-native/components-factory/createWebObjectAsComponent.types'

export type MarkerOptions = InferWebObjectOptions<
  MapLibreMarkerOptions,
  {
    element?: HTMLElementDescriptor
  }
>

export type MarkerMethods = InferWebObjectMethods<
  MapLibreMarker,
  {
    addTo: () => Promise<void>
    setEventedParent: (parentId: string) => Promise<void>
    setPopup: (popupId: string) => Promise<void>
  }
>

export type MarkerListeners = {
  // React native events.
  mount?: WebObjectListenerOnRN<void>
  unmount?: WebObjectListenerOnRN<void>
  // MapLibre GL JS events.
  // https://maplibre.org/maplibre-gl-js/docs/API/classes/Marker/#events
  dragstart?: WebObjectListenerOnObject<Event>
  drag?: WebObjectListenerOnObject<Event>
  dragend?: WebObjectListenerOnObject<Event>
  // HTMLElement events.
  click?: WebObjectListenerOnHTMLElement<MouseEvent>
}
