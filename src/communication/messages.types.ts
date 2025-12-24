import type {
  WebObjectId,
  WebObjectListeners,
  WebObjectMethodCallRequestId,
  WebObjectOptionsInferred,
  WebObjectType,
} from '../react-native/web-objects-factory/createWebObjectAsComponent.types'
import type {
  MapSourceId,
  MapSourceLayerListeners,
  MapSourceProps,
} from '../react-native/map-sources-factory/createMapSourceAsComponent.types'

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
  | {
      type: 'mapSourceMount'
      payload: MapSourceProps<any>
    }
  | {
      type: 'mapSourceUnmount'
      payload: {
        sourceId: MapSourceId
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
   * Event issued by a map source layer, eligible to be listened to from the RN
   * world.
   */
  | {
      type: 'mapSourceListenerEvent'
      payload: {
        sourceId: MapSourceId
        eventName: keyof MapSourceLayerListeners
        event?: any
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
