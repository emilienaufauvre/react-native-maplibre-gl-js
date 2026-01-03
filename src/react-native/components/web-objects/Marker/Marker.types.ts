import {
  type Event,
  type LngLatLike,
  type Marker as MapLibreMarker,
  type MarkerOptions as MapLibreMarkerOptions,
} from 'maplibre-gl'
import type {
  WebObjectListenerOnHTMLElement,
  WebObjectListenerOnObject,
  WebObjectListenerOnRN,
  WebObjectMethodsInferred,
  WebObjectOptionsInferred,
  WebObjectProps,
  WebObjectRef,
} from '../../../components-factories/web-objects/createWebObjectAsComponent.types'
import type { HTMLElementDescriptor } from '../../../../communication/messages.types'

/**
 * Marker component ref.
 * @interface
 * @group Types (web objects)
 */
export type MarkerRef = WebObjectRef<MarkerMethods>

/**
 * Marker component props.
 * @interface
 * @group Types (web objects)
 */
export type MarkerProps = WebObjectProps<MarkerOptions, MarkerListeners>

/**
 * @interface
 * @group Marker types
 */
export type MarkerMethods = WebObjectMethodsInferred<
  MapLibreMarker,
  {
    // No need to pass the map.
    addTo: () => Promise<void>
    // Work with ID instead of object reference.
    setEventedParent: (parentId: string) => Promise<void>
    // Work with ID instead of object reference.
    setPopup: (popupId: string) => Promise<void>
  }
>
/**
 * @interface
 * @group Marker types
 */
export type MarkerOptions = WebObjectOptionsInferred<
  MapLibreMarkerOptions & { coordinate?: LngLatLike },
  {
    element?: HTMLElementDescriptor
  }
>
/**
 * @interface
 * @group Marker types
 */
export type MarkerListeners = {
  // React native events.
  mount?: WebObjectListenerOnRN<void>
  unmount?: WebObjectListenerOnRN<void>
  // `MapLibre GL JS` events.
  dragstart?: WebObjectListenerOnObject<Event>
  drag?: WebObjectListenerOnObject<Event>
  dragend?: WebObjectListenerOnObject<Event>
  // HTMLElement events.
  click?: WebObjectListenerOnHTMLElement<MouseEvent>
}
