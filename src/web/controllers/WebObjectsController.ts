import type {
  HTMLElementDescriptor,
  MessageFromRNToWeb,
} from '../../communication/messages.types'
import maplibregl, { type MapLayerEventType } from 'maplibre-gl'
import {
  getHTMLElementDescriptorListenerName,
  isWebObjectListenerOnHTMLElement,
  isWebObjectListenerOnMapLayer,
  isWebObjectListenerOnObject,
} from '../../communication/messages.utils'
import type {
  WebObjectClass,
  WebObjectId,
  WebObjectListenerOnMapLayer,
  WebObjectListeners,
  WebObjectOptionsInferred,
  WebObjectType,
} from '../../react-native/components-factories/web-objects/createWebObjectAsComponent.types'
import type ReactNativeBridge from '../bridge/ReactNativeBridge'
import { stableStringify } from '../../react-native/hooks/atoms/useMapAtoms.utils'
import {
  MAP_OPTIONS_THAT_ARE_HTML_ELEMENTS,
  MAP_OPTIONS_THAT_ARE_WEB_FUNCTIONS,
} from '../../react-native/components/web-objects/Map/Map.types'
import {
  MARKER_OPTIONS_THAT_ARE_HTML_ELEMENTS,
  MARKER_OPTIONS_THAT_ARE_WEB_FUNCTIONS,
} from '../../react-native/components/web-objects/Marker/Marker.types'
import {
  POPUP_OPTIONS_THAT_ARE_HTML_ELEMENTS,
  POPUP_OPTIONS_THAT_ARE_WEB_FUNCTIONS,
} from '../../react-native/components/web-objects/Popup/Popup.types'

/**
 *
 */
export default class WebObjectsController {
  #objects = new Map<string, WebObjectClass>()
  #objectsOptions = new Map<string, WebObjectOptionsInferred<any>>()
  #mapId: string | undefined

  get map(): maplibregl.Map {
    const map = this.#objects.get(this.#mapId ?? '')
    if (!map) {
      throw new Error('Map not available')
    }
    return map as maplibregl.Map
  }

  /**
   * If the map object changed, add the existing object to the new map.
   * Note that listeners stay unchanged because attached to the object itself.
   * Send a mount event.
   */
  addExistingObjectsToMap = (
    reactNativeBridge: ReactNativeBridge,
    map: maplibregl.Map,
  ) => {
    this.#objects.entries().forEach(([id, object]) => {
      if (!(object instanceof maplibregl.Map)) {
        object.addTo(map)
        this.#sendEventToReactNative(id, reactNativeBridge, 'mount')
      }
    })
  }

  handleMountMessage = (
    message: Extract<MessageFromRNToWeb, { type: 'webObjectMount' }>,
    reactNativeBridge: ReactNativeBridge,
  ) => {
    const element = this.#addObject(
      message.payload.objectId,
      message.payload.objectType,
      message.payload.options,
      reactNativeBridge,
    )
    this.#setObjectListeners(
      reactNativeBridge,
      element,
      message.payload.objectId,
      message.payload.listeners,
    )
    this.#objects.set(message.payload.objectId, element)
    this.#objectsOptions.set(message.payload.objectId, message.payload.options)
  }

  handleUpdateMessage = (
    message: Extract<MessageFromRNToWeb, { type: 'webObjectUpdate' }>,
    reactNativeBridge: ReactNativeBridge,
  ) => {
    const element = this.#updateObject(
      message.payload.objectId,
      message.payload.objectType,
      message.payload.options,
      reactNativeBridge,
    )
    this.#setObjectListeners(
      reactNativeBridge,
      element,
      message.payload.objectId,
      message.payload.listeners,
    )
    this.#objects.set(message.payload.objectId, element)
    this.#objectsOptions.set(message.payload.objectId, message.payload.options)
  }

  handleUnmountMessage = (
    message: Extract<MessageFromRNToWeb, { type: 'webObjectUnmount' }>,
    reactNativeBridge: ReactNativeBridge,
  ) => {
    this.#removeObject(message.payload.objectId, reactNativeBridge)
    this.#objects.delete(message.payload.objectId)
    this.#objectsOptions.delete(message.payload.objectId)
  }

  handleMethodCall = async (
    message: Extract<MessageFromRNToWeb, { type: 'webObjectMethodCall' }>,
    reactNativeBridge: ReactNativeBridge,
  ) => {
    const object = this.#objects.get(message.payload.objectId)

    if (!object) {
      return
    }

    let result

    if (!(await this.#runIfSpecialMethod(message, object))) {
      result = await this.#runNormalMethod(message, object)
      // Verify that the result is serializable. If not, return null.
      try {
        JSON.stringify(result)
      } catch (error) {
        result = null
      }
    }

    reactNativeBridge.postMessage({
      type: 'webObjectMethodResponse',
      payload: { requestId: message.payload.requestId, result },
    })
  }

  #addObject = (
    objectId: WebObjectId,
    objectType: WebObjectType,
    options: WebObjectOptionsInferred<any>,
    reactNativeBridge: ReactNativeBridge,
  ): WebObjectClass => {
    let element: WebObjectClass | undefined

    switch (objectType) {
      case 'map': {
        options = this.#resolveDescriptorsInOptions(
          objectId,
          reactNativeBridge,
          options,
          MAP_OPTIONS_THAT_ARE_WEB_FUNCTIONS,
          MAP_OPTIONS_THAT_ARE_HTML_ELEMENTS,
        )
        const htmlContainer = document.getElementById('app')!
        element = new maplibregl.Map({
          ...options,
          container: options.container ?? htmlContainer,
        })
        this.#mapId = objectId
        break
      }
      case 'marker': {
        options = this.#resolveDescriptorsInOptions(
          objectId,
          reactNativeBridge,
          options,
          MARKER_OPTIONS_THAT_ARE_WEB_FUNCTIONS,
          MARKER_OPTIONS_THAT_ARE_HTML_ELEMENTS,
        )
        element = new maplibregl.Marker(options)
          .setLngLat(options.coordinate ?? [0, 0])
          .addTo(this.map)
        break
      }
      case 'popup': {
        options = this.#resolveDescriptorsInOptions(
          objectId,
          reactNativeBridge,
          options,
          POPUP_OPTIONS_THAT_ARE_WEB_FUNCTIONS,
          POPUP_OPTIONS_THAT_ARE_HTML_ELEMENTS,
        )
        element = new maplibregl.Popup(options)
        break
      }
    }

    if (!element) {
      throw new Error(`Unsupported object type: ${objectType}`)
    }

    // Send the "mount" event to the React Native listener.
    this.#sendEventToReactNative(objectId, reactNativeBridge, 'mount')

    return element
  }

  #updateObject = (
    objectId: WebObjectId,
    objectType: WebObjectType,
    options: WebObjectOptionsInferred<any>,
    reactNativeBridge: ReactNativeBridge,
  ): WebObjectClass => {
    let element: WebObjectClass | undefined

    const oldOptionsAsString = stableStringify(
      this.#objectsOptions.get(objectId),
    )
    const newOptionsAsString = stableStringify(options)

    if (oldOptionsAsString !== newOptionsAsString) {
      this.#removeObject(objectId, reactNativeBridge)
      element = this.#addObject(
        objectId,
        objectType,
        options,
        reactNativeBridge,
      )
    } else {
      element = this.#objects.get(objectId)
    }

    if (!element) {
      throw new Error(`Object does not exist: ${objectId} - ${objectType}`)
    }

    return element
  }

  #removeObject = (
    objectId: WebObjectId,
    reactNativeBridge: ReactNativeBridge,
  ) => {
    const object = this.#objects.get(objectId)
    if (!object) {
      return
    }
    object.remove()
    // Send the "unmount" event to the React Native listener.
    this.#sendEventToReactNative(objectId, reactNativeBridge, 'unmount')
  }

  #setObjectListeners = (
    reactNativeBridge: ReactNativeBridge,
    object: WebObjectClass,
    objectId: string,
    listeners?: WebObjectListeners,
  ) => {
    if (!listeners) {
      return
    }
    Object.entries(listeners).forEach(([eventName, listener]) => {
      // Attach the listener to the object.
      if (isWebObjectListenerOnObject(listener)) {
        object.on(eventName, (event) =>
          this.#sendEventToReactNative(
            objectId,
            reactNativeBridge,
            eventName,
            event,
          ),
        )
      }
      // Attach the listener to a map layer.
      if (isWebObjectListenerOnMapLayer(listener)) {
        // Listening to only one layer of the map is only possible on map
        // events.
        if (object instanceof maplibregl.Map) {
          object.on(
            eventName as keyof MapLayerEventType,
            (listener as WebObjectListenerOnMapLayer<any>).layerId,
            (event) =>
              this.#sendEventToReactNative(
                objectId,
                reactNativeBridge,
                eventName,
                event,
              ),
          )
        }
      }
      // Attach the listener to the HTML element of the object
      if (isWebObjectListenerOnHTMLElement(listener)) {
        // Listening to the HTML element events is not possible on the map
        // object.
        if (!(object instanceof maplibregl.Map)) {
          object.getElement().addEventListener(eventName, (event: Event) => {
            this.#sendEventToReactNative(
              objectId,
              reactNativeBridge,
              eventName,
              event,
            )
            event.stopPropagation()
          })
        }
      }
    })
  }

  #runIfSpecialMethod = async (
    message: Extract<MessageFromRNToWeb, { type: 'webObjectMethodCall' }>,
    object: WebObjectClass,
  ) => {
    // Special cases for methods that have special parameters not compatible
    // with RN (see RN component types definitions). These methods always return
    // something. Return undefined if the method is not special.

    if (object instanceof maplibregl.Map) {
      switch (message.payload.method) {
        case 'addImage': {
          const image = await object.loadImage(message.payload.args[1])
          object.addImage(
            message.payload.args[0],
            image.data,
            message.payload.args.at(2),
          )
          return true
        }
      }
    }
    if (object instanceof maplibregl.Marker) {
      switch (message.payload.method) {
        case 'addTo': {
          object.addTo(this.map)
          return true
        }
        case 'setEventedParent': {
          const parentId = message.payload.args[0] as string
          const parent = this.#objects.get(parentId) ?? null
          if (parent) {
            object.setEventedParent(parent)
          }
          return true
        }
        case 'setPopup': {
          const popupId = message.payload.args[0] as string
          const popup = this.#objects.get(popupId) ?? null
          if (popup && popup instanceof maplibregl.Popup) {
            object.setPopup(popup)
          }
          return true
        }
      }
    }
    if (object instanceof maplibregl.Popup) {
      switch (message.payload.method) {
        case 'addTo': {
          object.addTo(this.map)
          return true
        }
        case 'setEventedParent': {
          const parentId = message.payload.args[0] as string
          const parent = this.#objects.get(parentId) ?? null
          if (parent) {
            object.setEventedParent(parent)
          }
          return true
        }
      }
    }
    return false
  }

  #runNormalMethod = async (
    message: Extract<MessageFromRNToWeb, { type: 'webObjectMethodCall' }>,
    object: WebObjectClass,
  ) => {
    return await object[message.payload.method as keyof typeof object]?.(
      ...message.payload.args,
    )
  }

  #resolveDescriptorsInOptions = (
    objectId: WebObjectId,
    reactNativeBridge: ReactNativeBridge,
    options: any,
    optionsThatAreFunctions: readonly string[],
    optionsThatAreHTMLElements: readonly string[],
  ): any => {
    if (options === null || typeof options !== 'object') {
      return options
    }

    // Flatten the array if needed.
    if (Array.isArray(options)) {
      return options.map((opt) =>
        this.#resolveDescriptorsInOptions(
          objectId,
          reactNativeBridge,
          opt,
          optionsThatAreFunctions,
          optionsThatAreHTMLElements,
        ),
      )
    }

    const resolved: any = {}

    // Parse for the options that are known to be descriptors for this object
    // type.
    for (const key in options) {
      if (optionsThatAreFunctions.includes(key)) {
        resolved[key] = (window as any)[options[key]]
      } else if (optionsThatAreHTMLElements.includes(key)) {
        resolved[key] = this.#buildHTMLElement(
          objectId,
          reactNativeBridge,
          options[key],
        )
      } else {
        resolved[key] = this.#resolveDescriptorsInOptions(
          objectId,
          reactNativeBridge,
          options[key],
          optionsThatAreFunctions,
          optionsThatAreHTMLElements,
        )
      }
    }
    return resolved
  }

  #buildHTMLElement = (
    objectId: WebObjectId,
    reactNativeBridge: ReactNativeBridge,
    descriptor?: HTMLElementDescriptor,
  ): HTMLElement | undefined => {
    // From a descriptor, build the corresponding HTMLElement.
    if (!descriptor) {
      return undefined
    }
    const element = document.createElement('div')
    // Provide the inner HTML (style + HTML) to the element.
    if (descriptor.innerHTML !== undefined) {
      element.innerHTML = descriptor.innerHTML
    }
    // Attach the listeners to the element.
    descriptor.listeners?.forEach((listener) => {
      element.addEventListener(listener.eventName, (event) => {
        const target = event.target as HTMLElement
        if (target.closest(listener.cssSelector)) {
          this.#sendEventToReactNative(
            objectId,
            reactNativeBridge,
            getHTMLElementDescriptorListenerName(listener),
            event,
          )
        }
      })
    })

    return element
  }

  #sendEventToReactNative = (
    objectId: WebObjectId,
    reactNativeBridge: ReactNativeBridge,
    eventName: string,
    event?: any,
  ) => {
    // Remove circular references that cannot be serialized.
    delete event?.target
    // Send the event to the React Native listener.
    reactNativeBridge.postMessage({
      type: 'webObjectListenerEvent',
      payload: {
        objectId,
        eventName,
        event,
      },
    })
  }
}
