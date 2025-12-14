import {
  type ForwardRefExoticComponent,
  type PropsWithoutRef,
  type RefAttributes,
} from 'react'

/**
 * React Native component that corresponds and perform actions with a web object
 * in the web world.
 * @group Types
 */
export type WebObjectComponent<
  Ref extends WebObjectRef<any>,
  Props extends WebObjectProps<any, any>,
> = ForwardRefExoticComponent<PropsWithoutRef<Props> & RefAttributes<Ref>>

/**
 * React Native ref of a component (corresponds to the web object methods in the
 * web world).
 * @group Types
 */
export type WebObjectRef<Methods extends WebObjectMethodsInferred<object>> =
  Omit<Methods, 0>

/**
 * React Native props of a component (used to instantiate the web object in the
 * web world).
 * @group Types
 */
export type WebObjectProps<
  Options extends WebObjectOptionsInferred<any>,
  Listeners extends WebObjectListeners,
> = {
  /**
   * The MapLibreGL JS options used to mount the web object.
   */
  options?: Partial<Options>
  /**
   * The listeners to be set on the web object events.
   */
  listeners?: Partial<Listeners>
}

/**
 * Listeners that can be set by a component on the corresponding web object
 * events.
 * Event can be emitted by the web object itself, its HTML element, or be
 * specific to a map layer (if the object is the map).
 * By default, the mount/unmount events are available (they are custom, added
 * on top of the MapLibre GL JS events).
 *
 * Note: sadly, listeners cannot be inferred as Methods and Options, therefore,
 * when adding a new listener, one must ensure that the listeners correspond to
 * the real web object events.
 * @group Types
 */
export type WebObjectListeners = WebObjectListenersDefault &
  WebObjectListenersWeb

/**
 * Custom events introduced by this library, executed once the web object is
 * (un)mounted to the map.
 * @group Types
 */
export type WebObjectListenersDefault = {
  mount?: WebObjectListenerOnRN<void>
  unmount?: WebObjectListenerOnRN<void>
}

/**
 * MapLibre GL JS events as defined in the official documentation of the object.
 * @group Types
 */
export type WebObjectListenersWeb = {
  [eventName: string]:
    | WebObjectListenerOnRN<void>
    | WebObjectListenerOnObject<any>
    | WebObjectListenerOnMapLayer<any>
    | WebObjectListenerOnHTMLElement<any>
}

export type Listener<Event> = (event: Event) => void

/**
 * A listener on an event introduced by the React Native usage.
 * @group Types
 */
export type WebObjectListenerOnRN<Event> = {
  rnListener: Listener<Event>
}

/**
 * A listener to be set on an event emitted by the web object.
 * @group Types
 */
export type WebObjectListenerOnObject<Event> = {
  objectListener: Listener<Event>
}

/**
 * A listener to be set on an event emitted by the web object, but specific to
 * a map layer.
 * @group Types
 */
export type WebObjectListenerOnMapLayer<Event> = {
  layerListener: Listener<Event>
  layerId: string
}

/**
 * A listener to be set on an event emitted by the HTMLElement associated with
 * the web object.
 * @group Types
 */
export type WebObjectListenerOnHTMLElement<Event> = {
  elementListener: Listener<Event>
}

/**
 * Options that are used to instantiate a web object.
 * Filter out those options that cannot be set from the RN world and replace
 * them with the given replacements (e.g., HTMLElement that cannot be
 * instantiated in RN is replaced by HTMLElementDescriptor). Also, remove the
 * ones that should not be specified and used.
 * @group Types
 */
export type WebObjectOptionsInferred<
  WebObjectOptions,
  ReplacedOptions extends Partial<Record<keyof WebObjectOptions, any>> = {},
  RemovedOptions extends Partial<keyof WebObjectOptions> = never,
> = Omit<
  Omit<WebObjectOptions, keyof ReplacedOptions> & ReplacedOptions,
  RemovedOptions
>

/**
 * Methods that are used to call web object methods from the RN world.
 * Filter out those methods that cannot be used from the RN world and replace
 * them with the given replacements (e.g., Marker.setPopup cannot be used
 * because we cannot instantiate a web Popup object in RN, therefore, we
 * override it to allow the usage of a React Native Popup object).
 * The goal of this type is to provide all the web methods of the object
 * within the RN world as a 1:1 mapping.
 * All methods are transformed into async ones that return a Promise of the
 * original return type.
 * To be used with the associated proxy to make the call to the methods
 * effective.
 * @group Types
 */
export type WebObjectMethodsInferred<
  WebObject,
  ReplacedMethods extends {
    [K in keyof OnlyMethods<WebObject>]?: (...args: any[]) => any
  } = {},
> = Merge<
  AllMethodsToAsyncMethods<Merge<OnlyMethods<WebObject>, ReplacedMethods>>,
  { getId: () => string }
>

type OnlyMethods<T> = {
  [K in keyof T as T[K] extends (...args: any[]) => any ? K : never]: T[K]
}

type AllMethodsToAsyncMethods<T> = {
  [K in keyof T]: T[K] extends (...args: infer A) => infer R
    ? (...args: A) => Promise<R>
    : never
}

type Merge<M, N> = {
  [K in keyof M | keyof N]: K extends keyof N
    ? N[K]
    : K extends keyof M
      ? M[K]
      : never
}
