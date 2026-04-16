import {
  type Event,
  type Popup as MapLibrePopup,
  type PopupOptions as MapLibrePopupOptions,
} from 'maplibre-gl'
import type {
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

export const POPUP_OPTIONS_THAT_ARE_WEB_FUNCTIONS = [] as const

export const POPUP_OPTIONS_THAT_ARE_HTML_ELEMENTS = ['element'] as const

export const POPUP_METHODS_THAT_CONTAINS_HTML_ELEMENTS = [
  'setDOMContent',
] as const

/**
 * Popup component ref.
 * @interface
 * @group Types (web objects)
 */
export type PopupRef = WebObjectRef<PopupMethods>

/**
 * Popup component props.
 * @interface
 * @group Types (web objects)
 */
export type PopupProps = WebObjectProps<PopupOptions, PopupListeners>

/**
 * @interface
 * @group Popup types
 */
export type PopupMethodsOverwritten = {
  // No need to pass the map.
  addTo: () => Promise<void>
  // Work with ID instead of object reference.
  setEventedParent: (parentId: string) => Promise<void>
  // Work with and HTML element descriptor instead of object reference.
  setDOMContent: (element: HTMLElementDescriptor) => Promise<void>
}

/**
 * @interface
 * @group Popup types
 */
export type PopupMethods = WebObjectMethodsInferred<
  MapLibrePopup,
  PopupMethodsOverwritten
>

/**
 * @interface
 * @group Popup types
 */
export type PopupOptionsThatAreWebFunctions = {
  // eslint-disable-next-line max-len
  [K in (typeof POPUP_OPTIONS_THAT_ARE_WEB_FUNCTIONS)[number]]?: WebFunctionDescriptor
}

/**
 * @interface
 * @group Popup types
 */
export type PopupOptionsThatAreHTMLElements = {
  // eslint-disable-next-line max-len
  [K in (typeof POPUP_OPTIONS_THAT_ARE_HTML_ELEMENTS)[number]]?: HTMLElementDescriptor
}

/**
 * Popup options that are not part of the MapLibre Popup options but added for
 * this library.
 * @interface
 * @group Popup types
 */
export type MarkerOptionsCustom = {
  element?: HTMLElementDescriptor
}

/**
 * @interface
 * @group Popup types
 */
export type PopupOptions = WebObjectOptionsInferred<
  MapLibrePopupOptions & MarkerOptionsCustom,
  PopupOptionsThatAreWebFunctions & PopupOptionsThatAreHTMLElements
>

/**
 * @interface
 * @group Popup types
 */
export type PopupListeners = {
  // React native events.
  mount?: WebObjectListenerOnRN<void>
  unmount?: WebObjectListenerOnRN<void>
  // `MapLibre GL JS` events.
  open?: WebObjectListenerOnObject<Event>
  close?: WebObjectListenerOnObject<Event>
}
