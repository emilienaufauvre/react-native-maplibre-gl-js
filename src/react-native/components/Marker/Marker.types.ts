import {
  type Event,
  type Marker as MapLibreMarker,
  type MarkerOptions as MapLibreMarkerOptions,
} from 'maplibre-gl'
import type { HTMLElementDescriptor } from 'react-native-maplibre-gl-js/communication/messages.types'
import type {
  WebObjectMethodsInferred,
  WebObjectOptionsInferred,
  WebObjectListenerOnHTMLElement,
  WebObjectListenerOnObject,
  WebObjectListenerOnRN,
  WebObjectProps,
  WebObjectRef,
} from 'react-native-maplibre-gl-js/react-native/components-factory/createWebObjectAsComponent.types'

/**
 * TODO
 * @group Types
 */
export type MarkerRef = WebObjectRef<MarkerMethods>

/**
 * TODO
 * @group Types
 */
export type MarkerProps = WebObjectProps<MarkerOptions, MarkerListeners>

type MarkerMethods = WebObjectMethodsInferred<
  MapLibreMarker,
  {
    addTo: () => Promise<void>
    setEventedParent: (parentId: string) => Promise<void>
    setPopup: (popupId: string) => Promise<void>
  }
>

type MarkerOptions = WebObjectOptionsInferred<
  MapLibreMarkerOptions,
  {
    element?: HTMLElementDescriptor
  }
>

type MarkerListeners = {
  // React native events.
  mount: WebObjectListenerOnRN<void>
  unmount: WebObjectListenerOnRN<void>
  // MapLibre GL JS events.
  // https://maplibre.org/maplibre-gl-js/docs/API/classes/Marker/#events
  dragstart: WebObjectListenerOnObject<Event>
  drag: WebObjectListenerOnObject<Event>
  dragend: WebObjectListenerOnObject<Event>
  // HTMLElement events.
  click: WebObjectListenerOnHTMLElement<MouseEvent>
}
