import type {
  HTMLElementDescriptor,
  MessageFromRNToWeb,
} from '../../communication/messages.types'
import maplibregl, { type MapLayerEventType } from 'maplibre-gl'
import {
  isWebObjectListenerOnHTMLElement,
  isWebObjectListenerOnMapLayer,
  isWebObjectListenerOnObject,
} from '../../communication/messages.utils'
import type {
  WebObjectClass,
  WebObjectListenerOnMapLayer,
  WebObjectListeners,
} from '../../react-native/components-factories/web-objects/createWebObjectAsComponent.types'
import type ReactNativeBridge from '../bridge/ReactNativeBridge'

export default class WebObjectsController {
  #objects = new Map<string, WebObjectClass>()
  #mapId: string | undefined

  get map(): maplibregl.Map {
    const map = this.#objects.get(this.#mapId ?? '')
    if (!map) {
      throw new Error('Map not available')
    }
    return map as maplibregl.Map
  }

  handleMountMessage = (
    message: Extract<MessageFromRNToWeb, { type: 'webObjectMount' }>,
    reactNativeBridge: ReactNativeBridge,
  ) => {
    let element: WebObjectClass | undefined

    switch (message.payload.objectType) {
      case 'map': {
        const htmlContainer = document.getElementById('app')!
        element = new maplibregl.Map({
          ...message.payload.options,
          container: htmlContainer,
        })
        this.#mapId = message.payload.objectId
        // If the map was unmounted and mounted back again (e.g., on "options"
        // props changed), add back the existing objects to it.
        this.#objects.entries().forEach(([, object]) => {
          if (!(object instanceof maplibregl.Map)) {
            object.addTo(element as any)
          }
        })
        break
      }
      case 'marker': {
        const htmlElement = this.#buildHTMLElement(
          message.payload.options.element,
        )
        element = new maplibregl.Marker({
          ...message.payload.options,
          element: htmlElement,
        })
          // TODO setup default location (needed by default)
          .setLngLat([0, 0])
          .addTo(this.map)
        break
      }
      case 'popup': {
        element = new maplibregl.Popup({
          ...message.payload.options,
        })
        //.addTo(this.map)
        break
      }
    }

    if (!element) {
      return
    }

    // Save the object.
    this.#objects.set(message.payload.objectId, element)
    // Add listeners on the map and/or HTML element.
    this.#setObjectListeners(
      reactNativeBridge,
      element,
      message.payload.objectId,
      message.payload.listeners,
    )
    // Send the "mount" event to the React Native listener.
    reactNativeBridge.postMessage({
      type: 'webObjectListenerEvent',
      payload: {
        objectId: message.payload.objectId,
        eventName: 'mount',
      },
    })
  }

  handleUnmountMessage = (
    message: Extract<MessageFromRNToWeb, { type: 'webObjectUnmount' }>,
    reactNativeBridge: ReactNativeBridge,
  ) => {
    const object = this.#objects.get(message.payload.objectId)
    if (!object) {
      return
    }
    // Remove the object from the map.
    object.remove()
    this.#objects.delete(message.payload.objectId)
    // Send the "unmount" event to the React Native listener.
    reactNativeBridge.postMessage({
      type: 'webObjectListenerEvent',
      payload: {
        objectId: message.payload.objectId,
        eventName: 'unmount',
      },
    })
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

    if (!this.#runIfSpecialMethod(message, object)) {
      result = await this.#runNormalMethod(message, object)
    }

    reactNativeBridge.postMessage({
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
    reactNativeBridge: ReactNativeBridge,
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
        reactNativeBridge.postMessage({
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
