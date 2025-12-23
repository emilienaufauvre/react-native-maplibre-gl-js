import {
  type Map as MapLibreMap,
  type MapContextEvent,
  type MapLayerMouseEvent,
  type MapLayerTouchEvent,
  type MapLibreEvent,
  type MapLibreZoomEvent,
  type MapOptions as MapLibreMapOptions,
  MapTouchEvent,
  MapWheelEvent,
  ErrorEvent,
  type MapDataEvent,
  type MapStyleDataEvent,
  type MapSourceDataEvent,
  type MapStyleImageMissingEvent,
} from 'maplibre-gl'
import type {
  WebObjectMethodsInferred,
  WebObjectOptionsInferred,
  WebObjectListenerOnMapLayer,
  WebObjectListenerOnObject,
  WebObjectListenerOnRN,
  WebObjectProps,
  WebObjectRef,
} from '../../../web-objects-factory/createWebObjectAsComponent.types'

/**
 * Map component ref.
 * @interface
 * @group Types
 */
export type MapRef = WebObjectRef<MapMethods>

/**
 * Map component props.
 * @group Types
 */
export type MapProps = WebObjectProps<MapOptions, MapListeners>

/**
 * @interface
 * @group Map types
 */
export type MapMethods = WebObjectMethodsInferred<MapLibreMap>
/**
 * @interface
 * @group Map types
 */
export type MapOptions = WebObjectOptionsInferred<
  MapLibreMapOptions,
  {},
  'container'
>
/**
 * @interface
 * @group Map types
 */
export type MapListeners = {
  // React native events.
  mount?: WebObjectListenerOnRN<void>
  unmount?: WebObjectListenerOnRN<void>
  // `MapLibre GL JS` events.
  mousedown?:
    | WebObjectListenerOnObject<MapLayerMouseEvent>
    | WebObjectListenerOnMapLayer<MapLayerMouseEvent>
  mouseup?:
    | WebObjectListenerOnObject<MapLayerMouseEvent>
    | WebObjectListenerOnMapLayer<MapLayerMouseEvent>
  mouseover?:
    | WebObjectListenerOnObject<MapLayerMouseEvent>
    | WebObjectListenerOnMapLayer<MapLayerMouseEvent>
  mouseout?:
    | WebObjectListenerOnObject<MapLayerMouseEvent>
    | WebObjectListenerOnMapLayer<MapLayerMouseEvent>
  mousemove?:
    | WebObjectListenerOnObject<MapLayerMouseEvent>
    | WebObjectListenerOnMapLayer<MapLayerMouseEvent>
  mouseenter?: WebObjectListenerOnMapLayer<MapLayerMouseEvent>
  mouseleave?: WebObjectListenerOnMapLayer<MapLayerMouseEvent>
  click?:
    | WebObjectListenerOnObject<MapLayerMouseEvent>
    | WebObjectListenerOnMapLayer<MapLayerMouseEvent>
  dblclick?:
    | WebObjectListenerOnObject<MapLayerMouseEvent>
    | WebObjectListenerOnMapLayer<MapLayerMouseEvent>
  contextmenu?:
    | WebObjectListenerOnObject<MapLayerMouseEvent>
    | WebObjectListenerOnMapLayer<MapLayerMouseEvent>
  touchstart?:
    | WebObjectListenerOnObject<MapLayerTouchEvent>
    | WebObjectListenerOnMapLayer<MapLayerTouchEvent>
  touchend?:
    | WebObjectListenerOnObject<MapLayerTouchEvent>
    | WebObjectListenerOnMapLayer<MapLayerTouchEvent>
  touchcancel?:
    | WebObjectListenerOnObject<MapLayerTouchEvent>
    | WebObjectListenerOnMapLayer<MapLayerTouchEvent>
  wheel?: WebObjectListenerOnObject<MapWheelEvent>
  resize?: WebObjectListenerOnObject<MapLibreEvent>
  remove?: WebObjectListenerOnObject<MapLibreEvent>
  touchmove?: WebObjectListenerOnObject<MapTouchEvent>
  movestart?: WebObjectListenerOnObject<
    MapLibreEvent<MouseEvent | TouchEvent | WheelEvent | undefined>
  >
  move?: WebObjectListenerOnObject<
    MapLibreEvent<MouseEvent | TouchEvent | WheelEvent | undefined>
  >
  moveend?: WebObjectListenerOnObject<
    MapLibreEvent<MouseEvent | TouchEvent | WheelEvent | undefined>
  >
  dragstart?: WebObjectListenerOnObject<
    MapLibreEvent<MouseEvent | TouchEvent | undefined>
  >
  drag?: WebObjectListenerOnObject<
    MapLibreEvent<MouseEvent | TouchEvent | undefined>
  >
  dragend?: WebObjectListenerOnObject<
    MapLibreEvent<MouseEvent | TouchEvent | undefined>
  >
  zoomstart?: WebObjectListenerOnObject<
    MapLibreEvent<MouseEvent | TouchEvent | WheelEvent | undefined>
  >
  zoom?: WebObjectListenerOnObject<
    MapLibreEvent<MouseEvent | TouchEvent | WheelEvent | undefined>
  >
  zoomend?: WebObjectListenerOnObject<
    MapLibreEvent<MouseEvent | TouchEvent | WheelEvent | undefined>
  >
  rotatestart?: WebObjectListenerOnObject<
    MapLibreEvent<MouseEvent | TouchEvent | undefined>
  >
  rotate?: WebObjectListenerOnObject<
    MapLibreEvent<MouseEvent | TouchEvent | undefined>
  >
  rotateend?: WebObjectListenerOnObject<
    MapLibreEvent<MouseEvent | TouchEvent | undefined>
  >
  pitchstart?: WebObjectListenerOnObject<
    MapLibreEvent<MouseEvent | TouchEvent | undefined>
  >
  pitch?: WebObjectListenerOnObject<
    MapLibreEvent<MouseEvent | TouchEvent | undefined>
  >
  pitchend?: WebObjectListenerOnObject<
    MapLibreEvent<MouseEvent | TouchEvent | undefined>
  >
  boxzoomstart?: WebObjectListenerOnObject<MapLibreZoomEvent>
  boxzoomend?: WebObjectListenerOnObject<MapLibreZoomEvent>
  boxzoomcancel?: WebObjectListenerOnObject<MapLibreZoomEvent>
  webglcontextlost?: WebObjectListenerOnObject<MapContextEvent>
  webglcontextrestored?: WebObjectListenerOnObject<MapContextEvent>
  load?: WebObjectListenerOnObject<MapLibreEvent>
  render?: WebObjectListenerOnObject<MapLibreEvent>
  idle?: WebObjectListenerOnObject<MapLibreEvent>
  error?: WebObjectListenerOnObject<ErrorEvent>
  data?: WebObjectListenerOnObject<MapDataEvent>
  styledata?: WebObjectListenerOnObject<MapStyleDataEvent>
  sourcedata?: WebObjectListenerOnObject<MapSourceDataEvent>
  dataloading?: WebObjectListenerOnObject<MapDataEvent>
  styledataloading?: WebObjectListenerOnObject<MapStyleDataEvent>
  sourcedataloading?: WebObjectListenerOnObject<MapSourceDataEvent>
  styleimagemissing?: WebObjectListenerOnObject<MapStyleImageMissingEvent>
  dataabort?: WebObjectListenerOnObject<MapDataEvent>
  sourcedataabort?: WebObjectListenerOnObject<MapSourceDataEvent>
}
