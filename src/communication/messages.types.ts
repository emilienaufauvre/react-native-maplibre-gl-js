import type {
  Map as MapLibreMap,
  Marker as MapLibreMarker,
  Popup as MapLibrePopup,
} from 'maplibre-gl'
import type {
  WebObjectOptionsInferred,
  WebObjectListeners,
} from 'react-native-maplibre-gl-js/react-native/components-factory/createWebObjectAsComponent.types'

/**
 * The web objects that are supported by this library.
 * A string version to be used as an identifier on the RN side (cannot use
 * MapLibre classes directly).
 * Must correspond to `WebObjectClass`.
 */
export type WebObjectType = 'map' | 'marker' | 'popup'

/**
 * The web objects that are supported by this library.
 * A class version to be used on the web side.
 * Must correspond to `WebObjectType`.
 */
export type WebObjectClass = MapLibreMap | MapLibreMarker | MapLibrePopup

/**
 * UID of a web object in the web world.
 */
export type WebObjectId = string

/**
 * UID of a request for a web object method to be executed.
 */
export type WebObjectMethodCallRequestId = string

export type MessageFromRNToWeb =
  /**
   * TODO Messages about a MapLibre object.
   */
  | {
      type: 'webObjectMount'
      payload: {
        objectId: WebObjectId
        objectType: WebObjectType
        options: WebObjectOptionsInferred<any>
        listeners: WebObjectListeners
      }
    }
  | {
      type: 'webObjectUnmount'
      payload: {
        objectId: WebObjectId
      }
    }
  | {
      type: 'webObjectMethodCall'
      payload: {
        requestId: WebObjectMethodCallRequestId
        objectId: WebObjectId
        method: string
        args: any[]
      }
    }
  | {
      type: 'webObjectOptionsUpdate'
      payload: {
        objectId: WebObjectId
        options: WebObjectOptionsInferred<any>
      }
    }

export type MessageFromWebToRN =
  /**
   * Anything that should be logged in the React Native world.
   */
  | {
      type: 'console'
      payload: {
        level: 'debug' | 'info' | 'error'
        args: [string, ...any[]]
      }
    }
  /**
   * Notify the React Native world that the web one is ready.
   */
  | {
      type: 'ready'
    }
  /**
   * Event issued by a web object, eligible to be listened to from the RN world.
   */
  | {
      type: 'webObjectListenerEvent'
      payload: {
        objectId: WebObjectId
        eventName: keyof WebObjectListeners
        event?: any
      }
    }
  /**
   * Response to a call to a method of a web object.
   */
  | {
      type: 'webObjectMethodResponse'
      payload: {
        requestId: WebObjectMethodCallRequestId
        result: any
      }
    }

/**
 * To replace HTMLElement instances that cannot be created in React Native.
 */
export type HTMLElementDescriptor = {
  tagName?: string
  className?: string
  attributes?: Record<string, string>
  style?: Record<string, string>
  dataset?: Record<string, string>
  innerHTML?: string
}
