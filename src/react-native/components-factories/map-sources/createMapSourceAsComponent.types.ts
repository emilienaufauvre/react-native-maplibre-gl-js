import type {
  AddLayerObject,
  MapLayerMouseEvent,
  MapLayerTouchEvent,
} from 'maplibre-gl'
import type { FC } from 'react'
import type { GeoJSONSourceSpecification } from '@maplibre/maplibre-gl-style-spec'
/*
TODO to be implemented
import type {
  ImageSourceSpecification,
  RasterDEMSourceSpecification,
  RasterSourceSpecification,
  VectorSourceSpecification,
  VideoSourceSpecification,
  CanvasSourceSpecification,
} from '@maplibre/maplibre-gl-style-spec'
 */

/**
 * The map sources that are supported by this library.
 * A class version to be used on the web side.
 * @group Map source abstraction types
 */
export type MapSourceClass = GeoJSONSourceSpecification

/**
 * React Native component that corresponds and perform actions with a map source
 * and its layers in the web world.
 * @group Map source abstraction types
 */
export type MapSourceComponent<SourceSpec extends MapSourceClass> = FC<
  MapSourceProps<SourceSpec>
>

/**
 * React Native props of a component (used to instantiate the map source and
 * layer(s) in the web world).
 * @interface
 * @group Map source abstraction types
 */
export type MapSourceProps<SourceSpec extends MapSourceClass> = {
  id: MapSourceId
  source: SourceSpec
  /**
   * One or more layers to be added to the map. The layers are based on the
   * current source.
   */
  layers: {
    layer: Omit<MapSourceLayerWithSourceId, 'source'>
    beforeId?: string
    listeners?: MapSourceLayerListeners
  }[]
}

/**
 * Listeners that can be set by a component on the corresponding map layer
 * events.
 * By default, the mount/unmount events are available (they are custom, added
 * on top of the `MapLibre GL JS` events).
 *
 * Note: sadly, listeners cannot be inferred from the MapLibre GL JS library.
 * Therefore, if a new listener is added within the library, it must also be
 * added here.
 * @group Map source abstraction types
 */
export type MapSourceLayerListeners = {
  // React native events.
  mount?: Listener<void>
  unmount?: Listener<void>
  // `MapLibre GL JS` events.
  mousedown?: Listener<MapLayerMouseEvent>
  mouseup?: Listener<MapLayerMouseEvent>
  mouseover?: Listener<MapLayerMouseEvent>
  mouseout?: Listener<MapLayerMouseEvent>
  mousemove?: Listener<MapLayerMouseEvent>
  mouseenter?: Listener<MapLayerMouseEvent>
  mouseleave?: Listener<MapLayerMouseEvent>
  click?: Listener<MapLayerMouseEvent>
  dblclick?: Listener<MapLayerMouseEvent>
  contextmenu?: Listener<MapLayerMouseEvent>
  touchstart?: Listener<MapLayerTouchEvent>
  touchend?: Listener<MapLayerTouchEvent>
  touchcancel?: Listener<MapLayerTouchEvent>
}

/**
 * A layer specification that does not contain the source property (added
 * automatically to match the current source id).
 * @group Map source abstraction types
 */
export type MapSourceLayerWithSourceId = Extract<
  AddLayerObject,
  { source: string }
>

export type Listener<Event> = (event: Event) => void

/**
 * UID of a map source in the web world.
 * @group Map source abstraction types
 */
export type MapSourceId = string
