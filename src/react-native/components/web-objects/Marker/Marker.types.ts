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
import type {
  HTMLElementDescriptor,
  WebFunctionDescriptor,
} from '../../../../communication/messages.types'

export const MARKER_OPTIONS_THAT_ARE_WEB_FUNCTIONS = [] as const

export const MARKER_OPTIONS_THAT_ARE_HTML_ELEMENTS = ['element'] as const

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
export type MarkerOptionsThatAreWebFunctions = {
  // eslint-disable-next-line max-len
  [K in (typeof MARKER_OPTIONS_THAT_ARE_WEB_FUNCTIONS)[number]]?: WebFunctionDescriptor
}

/**
 * @interface
 * @group Marker types
 */
export type MarkerOptionsThatAreHTMLElements = {
  // eslint-disable-next-line max-len
  [K in (typeof MARKER_OPTIONS_THAT_ARE_HTML_ELEMENTS)[number]]?: HTMLElementDescriptor
}

/**
 * Marker options that are not part of the MapLibre Marker options but added for
 * this library.
 * @interface
 * @group Marker types
 */
export type MarkerOptionsCustom = {
  coordinate?: LngLatLike
}

/**
 * @interface
 * @group Marker types
 */
export type MarkerOptions = WebObjectOptionsInferred<
  MapLibreMarkerOptions & MarkerOptionsCustom,
  MarkerOptionsThatAreWebFunctions & MarkerOptionsThatAreHTMLElements
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
