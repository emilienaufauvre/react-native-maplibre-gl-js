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

export const POPUP_OPTIONS_THAT_ARE_HTML_ELEMENTS = [] as const

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
export type PopupMethods = WebObjectMethodsInferred<
  MapLibrePopup,
  {
    // No need to pass the map.
    addTo: () => Promise<void>
    // Work with ID instead of object reference.
    setEventedParent: (parentId: string) => Promise<void>
  }
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
 * @interface
 * @group Popup types
 */
export type PopupOptions = WebObjectOptionsInferred<
  MapLibrePopupOptions,
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
