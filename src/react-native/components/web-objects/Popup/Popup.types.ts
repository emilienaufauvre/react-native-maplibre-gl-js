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

/**
 * Popup component ref.
 * @interface
 * @group Types
 */
export type PopupRef = WebObjectRef<PopupMethods>

/**
 * Popup component props.
 * @interface
 * @group Types
 */
export type PopupProps = WebObjectProps<PopupOptions, PopupListeners>

/**
 * @interface
 * @group Popup types
 */
export type PopupMethods = WebObjectMethodsInferred<
  MapLibrePopup,
  {
    addTo: () => Promise<void>
    setEventedParent: (parentId: string) => Promise<void>
  }
>
/**
 * @interface
 * @group Popup types
 */
export type PopupOptions = WebObjectOptionsInferred<MapLibrePopupOptions>
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
