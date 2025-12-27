import type {
  AddLayerObject,
  ImageSourceSpecification,
  MapLayerEventType,
  VideoSourceSpecification,
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
  CanvasSourceSpecification,
} from '@maplibre/maplibre-gl-style-spec'
 */

/**
 * The map sources that are supported by this library.
 * A class version to be used on the web side.
 * @group Map source abstraction types
 */
export type MapSourceClass =
  | GeoJSONSourceSpecification
  | ImageSourceSpecification
  | VideoSourceSpecification

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
  /**
   * The source identifier. It must be unique among all the sources of the map;
   * otherwise, unexpected behaviors may occur.
   */
  id: MapSourceId
  /**
   * The source specification to be added to the map (as defined in the
   * `MapLibre GL JS` documentation).
   */
  source: SourceSpec
  /**
   * One or more layers to be added to the map. The layers are based on the
   * current source.
   */
  layers: MapSourceLayer[]
}

/**
 * A layer specification that can be added to a map source.
 * @interface
 * @group Map source abstraction types
 */
export type MapSourceLayer = {
  layer: Omit<MapSourceLayerWithSourceId, 'source'>
  beforeId?: string
  listeners?: MapSourceLayerListeners
}

/**
 * Listeners that can be set by a component on the corresponding map layer
 * events.
 * By default, the mount/unmount events are available (they are custom, added
 * on top of the `MapLibre GL JS` events).
 * @interface
 * @group Map source abstraction types
 */
export type MapSourceLayerListeners = {
  // React native events.
  mount?: Listener<void>
  unmount?: Listener<void>
} & Partial<{
  [K in keyof MapLayerEventType]: (ev: MapLayerEventType[K]) => void
}>

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

/**
 * UID of a map source layer in the web world.
 * @group Map source abstraction types
 */
export type MapSourceLayerId = string
