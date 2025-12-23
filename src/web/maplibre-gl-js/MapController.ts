import maplibregl, { type MapLayerEventType } from 'maplibre-gl'
import type ReactNativeBridge from '../bridge/ReactNativeBridge'
import type {
  HTMLElementDescriptor,
  MessageFromRNToWeb,
  WebObjectClass,
} from '../../communication/messages.types'
import WebLogger from '../logger/web-logger'
import {
  isWebObjectListenerOnHTMLElement,
  isWebObjectListenerOnMapLayer,
  isWebObjectListenerOnObject,
} from '../../communication/messages.utils'
import type {
  WebObjectListenerOnMapLayer,
  WebObjectListeners,
} from '../../react-native/web-objects-factory/createWebObjectAsComponent.types'

/**
 * Manage the `MapLibre GL JS` map and its objects. Receive messages from the
 * React Native world and act accordingly.
 */
export default class MapController {
  #reactNativeBridge?: ReactNativeBridge
  #objects = new Map<string, WebObjectClass>()
  #mapId: string | undefined

  get reactNativeBridge(): ReactNativeBridge {
    if (!this.#reactNativeBridge) {
      throw new Error('React Native bridge not available')
    }
    return this.#reactNativeBridge
  }

  set reactNativeBridge(bridge: ReactNativeBridge) {
    this.#reactNativeBridge = bridge
  }

  get map(): maplibregl.Map {
    const map = this.#objects.get(this.#mapId ?? '')
    if (!map) {
      throw new Error('Map not available')
    }
    return map as maplibregl.Map
  }

  handleMessage = (message: MessageFromRNToWeb) => {
    WebLogger.info(this.handleMessage.name, message)

    switch (message.type) {
      case 'webObjectMount': {
        this.#handleWebObjectMountMessage(message)
        break
      }
      case 'webObjectUnmount': {
        this.#handleWebObjectUnmountMessage(message)
        break
      }
      case 'webObjectMethodCall': {
        this.#handleWebObjectMethodCall(message).then()
        break
      }
    }
  }

  #handleWebObjectMountMessage = (
    message: Extract<MessageFromRNToWeb, { type: 'webObjectMount' }>,
  ) => {
    switch (message.payload.objectType) {
      case 'map': {
        // 1) Create the MapLibre element.
        const container = document.getElementById('app')!
        const map = new maplibregl.Map({
          ...message.payload.options,
          container,
        })
        this.#objects.set(message.payload.objectId, map)
        this.#mapId = message.payload.objectId
        // 2) Add listeners on the map and/or HTML element.
        this.#setObjectListeners(
          map,
          message.payload.objectId,
          message.payload.listeners,
        )
        // 3) If the map was unmounted and mounted back again (e.g., on
        //    "options" props changed), add back the existing objects to it.
        this.#objects.entries().forEach(([, object]) => {
          if (!(object instanceof maplibregl.Map)) {
            object.addTo(map)
          }
        })
        break
      }
      case 'marker': {
        // default marker element
        const element = this.#buildHTMLElement(message.payload.options.element)
        // 1) Create the MapLibre element.
        const marker = new maplibregl.Marker({
          ...message.payload.options,
          element,
        })
          // TODO setup default location (needed by default)
          .setLngLat([0, 0])
          .addTo(this.map)
        this.#objects.set(message.payload.objectId, marker)
        // 2) Add listeners on the map and/or HTML element.
        this.#setObjectListeners(
          marker,
          message.payload.objectId,
          message.payload.listeners,
        )
        break
      }
      case 'popup': {
        // 1) Create the MapLibre element.
        const popup = new maplibregl.Popup({
          ...message.payload.options,
        })
        //.addTo(this.map)
        this.#objects.set(message.payload.objectId, popup)
        // 2) Add listeners on the map and/or HTML element.
        this.#setObjectListeners(
          popup,
          message.payload.objectId,
          message.payload.listeners,
        )
        break
      }
    }
    // TODO confirm its indeed mounted.
    this.reactNativeBridge.postMessage({
      type: 'webObjectListenerEvent',
      payload: {
        objectId: message.payload.objectId,
        eventName: 'mount',
      },
    })
  }

  #handleWebObjectUnmountMessage = (
    message: Extract<MessageFromRNToWeb, { type: 'webObjectUnmount' }>,
  ) => {
    const object = this.#objects.get(message.payload.objectId)
    if (!object) {
      return
    }

    object.remove()
    this.#objects.delete(message.payload.objectId)

    this.reactNativeBridge.postMessage({
      type: 'webObjectListenerEvent',
      payload: {
        objectId: message.payload.objectId,
        eventName: 'unmount',
      },
    })
  }

  #handleWebObjectMethodCall = async (
    message: Extract<MessageFromRNToWeb, { type: 'webObjectMethodCall' }>,
  ) => {
    const object = this.#objects.get(message.payload.objectId)

    if (!object) {
      return
    }

    let result

    if (!this.#runIfSpecialMethod(message, object)) {
      result = await this.#runNormalMethod(message, object)
    }

    this.reactNativeBridge.postMessage({
      type: 'webObjectMethodResponse',
      payload: { requestId: message.payload.requestId, result },
    })
  }

  #runIfSpecialMethod = (
    message: Extract<MessageFromRNToWeb, { type: 'webObjectMethodCall' }>,
    object: WebObjectClass,
  ) => {
    // Special cases for methods that have special parameters not compatible
    // with RN (see RN component types definitions). These methods always return
    // something. Return undefined if the method is not special.

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

  #buildHTMLElement = (
    descriptor?: HTMLElementDescriptor,
  ): HTMLElement | undefined => {
    // From a descriptor, build the corresponding HTMLElement.
    if (!descriptor) {
      return undefined
    }

    const element = document.createElement(descriptor.tagName ?? 'div')
    element.className = descriptor.className ?? ''

    if (descriptor.attributes) {
      for (const [name, value] of Object.entries(descriptor.attributes)) {
        element.setAttribute(name, value)
      }
    }
    if (descriptor.style) {
      Object.assign(element.style, descriptor.style)
    }
    if (descriptor.dataset) {
      for (const [name, value] of Object.entries(descriptor.dataset)) {
        ;(element.dataset as any)[name] = value
      }
    }
    if (descriptor.innerHTML !== undefined) {
      element.innerHTML = descriptor.innerHTML
    }

    return element
  }

  #setObjectListeners = (
    object: WebObjectClass,
    objectId: string,
    listeners?: WebObjectListeners,
  ) => {
    if (!listeners) {
      return
    }
    Object.entries(listeners).forEach(([eventName, listener]) => {
      const sendEventToReactNative = (event: any) => {
        // Remove circular references that cannot be serialized.
        delete event.target
        // Send the event to the React Native listener.
        this.reactNativeBridge.postMessage({
          type: 'webObjectListenerEvent',
          payload: {
            objectId,
            eventName,
            event,
          },
        })
      }

      // Attach the listener to the object.
      if (isWebObjectListenerOnObject(listener)) {
        object.on(eventName, sendEventToReactNative)
      }
      // Attach the listener to a map layer.
      if (isWebObjectListenerOnMapLayer(listener)) {
        // Listening to only one layer of the map is only possible on map
        // events.
        if (object instanceof maplibregl.Map) {
          object.on(
            eventName as keyof MapLayerEventType,
            (listener as WebObjectListenerOnMapLayer<any>).layerId,
            sendEventToReactNative,
          )
        }
      }
      // Attach the listener to the HTML element of the object
      if (isWebObjectListenerOnHTMLElement(listener)) {
        // Listening to the HTML element events is not possible on the map
        // object.
        if (!(object instanceof maplibregl.Map)) {
          object
            .getElement()
            .addEventListener(eventName, sendEventToReactNative)
        }
      }
    })
  }
}
