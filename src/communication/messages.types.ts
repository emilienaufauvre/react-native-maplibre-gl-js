import type {
  WebObjectId,
  WebObjectListeners,
  WebObjectMethodCallRequestId,
  WebObjectProps,
  WebObjectType,
} from '../react-native/components-factories/web-objects/createWebObjectAsComponent.types'
import type {
  MapSourceId,
  MapSourceLayerId,
  MapSourceLayerListeners,
  MapSourceProps,
} from '../react-native/components-factories/map-sources/createMapSourceAsComponent.types'

/**
 * Messages about a MapLibre web object or a map source, sent from the RN world
 * to the web one.
 */
export type MessageFromRNToWeb =
  | {
      type: 'batch'
      payload: { messages: MessageFromRNToWeb[] }
    }
  | {
      type: 'webObjectMount'
      payload: WebObjectProps<any, any> & {
        objectId: WebObjectId
        objectType: WebObjectType
      }
    }
  | {
      type: 'webObjectUpdate'
      payload: WebObjectProps<any, any> & {
        objectId: WebObjectId
        objectType: WebObjectType
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
      type: 'mapSourceMount'
      payload: MapSourceProps<any>
    }
  | {
      type: 'mapSourceUpdate'
      payload: MapSourceProps<any>
    }
  | {
      type: 'mapSourceUnmount'
      payload: {
        sourceId: MapSourceId
      }
    }

/**
 * Messages about the web world, sent from the web one to the RN world.
 */
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
        layerId: MapSourceLayerId
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
