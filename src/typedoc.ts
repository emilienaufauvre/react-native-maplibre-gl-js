/**
 * Internal types exposed for the documentation, but not by the public API.
 * @module Internal types
 * @packageDocumentation
 * @sortStrategy sort-order
 */

// @group Map types.
export type {
  MapMethods,
  MapOptions,
  MapListeners,
} from './react-native/components/web-objects/Map/Map.types'

// @group Marker types.
export type {
  MarkerMethods,
  MarkerOptions,
  MarkerListeners,
} from './react-native/components/web-objects/Marker/Marker.types'

// @group Popup types.
export type {
  PopupMethods,
  PopupOptions,
  PopupListeners,
} from './react-native/components/web-objects/Popup/Popup.types'

// @group Web objects abstractions.
export type {
  WebObjectComponent,
  WebObjectRef,
  WebObjectProps,
  WebObjectListeners,
  WebObjectListenersDefault,
  WebObjectListenersWeb,
  WebObjectListenerOnRN,
  WebObjectListenerOnObject,
  WebObjectListenerOnMapLayer,
  WebObjectListenerOnHTMLElement,
  WebObjectOptionsInferred,
  WebObjectMethodsInferred,
} from './react-native/web-objects-factory/createWebObjectAsComponent.types'
