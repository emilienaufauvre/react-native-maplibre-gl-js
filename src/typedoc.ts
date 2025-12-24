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
  WebObjectType,
  WebObjectClass,
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
  WebObjectId,
  WebObjectMethodCallRequestId,
} from './react-native/components-factories/web-objects/createWebObjectAsComponent.types'

// @group Map sources abstractions.
export type {
  MapSourceClass,
  MapSourceComponent,
  MapSourceProps,
  MapSourceLayer,
  MapSourceLayerListeners,
  MapSourceLayerWithSourceId,
  MapSourceId,
  MapSourceLayerId,
} from './react-native/components-factories/map-sources/createMapSourceAsComponent.types'
