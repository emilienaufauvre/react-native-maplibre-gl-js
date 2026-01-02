import { atom } from 'jotai'
import type { WebView } from 'react-native-webview'
import type { MessageFromRNToWeb } from '../../../communication/messages.types'
import type {
  WebObjectId,
  WebObjectListeners,
  WebObjectMethodCallRequestId,
} from '../../components-factories/web-objects/createWebObjectAsComponent.types'
import type {
  MapSourceId,
  MapSourceLayerId,
  MapSourceLayerListeners,
} from '../../components-factories/map-sources/createMapSourceAsComponent.types'
import { stableStringify } from './useMapAtoms.utils'

export const mapAtoms = (() => {
  /**
   * The WebView used to render `MapLibre GL JS` views (the web world).
   */
  const webViewAtom = atom<WebView | null>(null)

  /**
   * True if the WebView is ready to be used.
   */
  const isWebWorldReadyAtom = atom(false)

  /**
   * True if the mount message of the map component is ready to be sent to the
   * web world.
   */
  const isMapMountMessageReadyAtom = atom(false)

  /**
   * True if the mount message of the map component was sent to the web world.
   */
  const isMapMountMessageDispatchedAtom = atom(false)

  /**
   * The queue of messages to be sent to the web world.
   */
  const messageQueueAtom = atom<MessageFromRNToWeb[]>([])

  /**
   * True if a flush of the message queue is already scheduled.
   */
  const isFlushScheduledAtom = atom(false)

  /**
   * When a method is invoked on a RN object, the call is forwarded to the
   * native method within the web world. The pending responses are stored within
   * this Map.
   */
  const webObjectPendingMethodResponsesAtom = atom<
    Map<string, (result: any) => void>
  >(new Map())

  /**
   * The callbacks registered to react to web objects events.
   */
  const webObjectsListenersAtom = atom<Map<string, WebObjectListeners>>(
    new Map(),
  )

  /**
   * The callbacks registered to react to map sources layers events.
   */
  const mapSourcesListenersAtom = atom<
    Map<
      string,
      { layerId: MapSourceLayerId; listeners: MapSourceLayerListeners }[]
    >
  >(new Map())

  /**
   * Enqueue message to be sent to the web world.
   */
  const enqueueMessageAtom = atom(
    null,
    (get, set, message: MessageFromRNToWeb) => {
      const q = get(messageQueueAtom)
      set(messageQueueAtom, [...q, message])
    },
  )

  /**
   * Dispatch the given message to the web world immediately (if possible),
   * otherwise queue it.
   */
  const dispatchMessageAtom = atom(
    null,
    (get, set, message: MessageFromRNToWeb) => {
      const isWebWorldReady = get(isWebWorldReadyAtom)
      const isMapMountMessageReady = get(isMapMountMessageReadyAtom)
      const webView = get(webViewAtom)

      const isMapMountMessage =
        message.type === 'webObjectMount' &&
        message.payload.objectType === 'map'

      // Always enqueue. If it's the map mount message, put it at the front and
      // mark that the map mount message can now be dispatched.
      const q = get(messageQueueAtom)
      if (isMapMountMessage) {
        set(messageQueueAtom, [message, ...q])
        set(isMapMountMessageReadyAtom, true)
      } else {
        set(messageQueueAtom, [...q, message])
      }

      // If conditions are met, schedule a single flush on the next tick.
      if (isWebWorldReady && isMapMountMessageReady && webView) {
        const isScheduled = get(isFlushScheduledAtom)
        if (!isScheduled) {
          set(isFlushScheduledAtom, true)
          setTimeout(() => {
            // Reset the scheduled flag and flush.
            // Note: set is safe to use here as jotai queues updates.
            // @ts-ignore
            set(isFlushScheduledAtom, false)
            // @ts-ignore
            set(flushMessagesAtom)
          }, 0)
        }
      }
    },
  )

  /**
   * Flush the queue of messages to the web world (if possible).
   */
  const flushMessagesAtom = atom(null, (get, set) => {
    const isWebWorldReady = get(isWebWorldReadyAtom)
    const isMapMountMessageReady = get(isMapMountMessageReadyAtom)
    const isMapMountMessageDispatched = get(isMapMountMessageDispatchedAtom)
    const webView = get(webViewAtom)
    const messageQueue = get(messageQueueAtom)

    if (
      !isWebWorldReady ||
      !isMapMountMessageReady ||
      !webView ||
      messageQueue.length === 0
    ) {
      return
    }

    // Post a single batched message containing the whole queue to minimize
    // bridge overhead.
    webView.postMessage(
      stableStringify({
        type: 'batch',
        payload: { messages: messageQueue },
      }),
    )

    set(messageQueueAtom, [])

    // Mark the map mount message as dispatched if it was not.
    if (!isMapMountMessageDispatched) {
      set(isMapMountMessageDispatchedAtom, true)
    }
  })

  /**
   * Register a promise resolver associated with a pending response to a web
   * world native object method call.
   */
  const setWebObjectPendingMethodResponseAtom = atom(
    null,
    (
      get,
      set,
      {
        requestId,
        resolve,
      }: {
        requestId: WebObjectMethodCallRequestId
        resolve: (result: any) => void
      },
    ) => {
      const map = new Map(get(webObjectPendingMethodResponsesAtom))
      map.set(requestId, resolve)
      set(webObjectPendingMethodResponsesAtom, map)
    },
  )

  /**
   * Resolve a pending response to a method call on a web object.
   */
  const resolveWebObjectPendingMethodResponseAtom = atom(
    null,
    (
      get,
      set,
      {
        requestId,
        result,
      }: {
        requestId: WebObjectMethodCallRequestId
        result: any
      },
    ) => {
      const map = new Map(get(webObjectPendingMethodResponsesAtom))
      const resolver = map.get(requestId)
      if (resolver) {
        resolver(result)
        map.delete(requestId)
        set(webObjectPendingMethodResponsesAtom, map)
      }
    },
  )

  /**
   * Delete a pending call to a web object method.
   */
  const deleteWebObjectPendingMethodResponseAtom = atom(
    null,
    (get, set, requestId: WebObjectMethodCallRequestId) => {
      const map = new Map(get(webObjectPendingMethodResponsesAtom))
      map.delete(requestId)
      set(webObjectPendingMethodResponsesAtom, map)
    },
  )

  /**
   * Set the callbacks to be executed when receiving an event of a specific web
   * object.
   */
  const setWebObjectListenersAtom = atom(
    null,
    (
      get,
      set,
      {
        objectId,
        listeners,
      }: {
        objectId: WebObjectId
        listeners: WebObjectListeners
      },
    ) => {
      const map = new Map(get(webObjectsListenersAtom))
      map.set(objectId, listeners)
      set(webObjectsListenersAtom, map)
    },
  )

  /**
   * Get the callbacks on a specific web object.
   */
  const getWebObjectListenersAtom = atom(
    null,
    (get, _set, { objectId }: { objectId: WebObjectId }) => {
      const map = get(webObjectsListenersAtom)
      return map.get(objectId)
    },
  )

  /**
   * Delete callbacks associated with a web object.
   */
  const deleteWebObjectListenersAtom = atom(
    null,
    (get, set, { objectId }: { objectId: WebObjectId }) => {
      const map = new Map(get(webObjectsListenersAtom))
      map.delete(objectId)
      set(webObjectsListenersAtom, map)
    },
  )

  /**
   * Set the callbacks to be executed when receiving an event of a specific map
   * source layer.
   */
  const setMapSourceListenersAtom = atom(
    null,
    (
      get,
      set,
      {
        sourceId,
        listeners,
      }: {
        sourceId: MapSourceId
        listeners: {
          layerId: MapSourceLayerId
          listeners: MapSourceLayerListeners
        }[]
      },
    ) => {
      const map = new Map(get(mapSourcesListenersAtom))
      map.set(sourceId, listeners)
      set(mapSourcesListenersAtom, map)
    },
  )

  /**
   * Get the callbacks on a specific map source.
   */
  const getMapSourceListenersAtom = atom(
    null,
    (
      get,
      _set,
      {
        sourceId,
        layerId,
      }: { sourceId: MapSourceId; layerId: MapSourceLayerId },
    ) => {
      const map = get(mapSourcesListenersAtom)
      return map.get(sourceId)?.find((item) => item.layerId === layerId)
        ?.listeners
    },
  )

  /**
   * Delete callbacks associated with a map source.
   */
  const deleteMapSourceListenersAtom = atom(
    null,
    (get, set, { sourceId }: { sourceId: MapSourceId }) => {
      const map = new Map(get(mapSourcesListenersAtom))
      map.delete(sourceId)
      set(mapSourcesListenersAtom, map)
    },
  )

  return {
    webViewAtom,
    isWebWorldReadyAtom,
    isMapMountMessageReadyAtom,
    isMapMountMessageDispatchedAtom,
    messageQueueAtom,
    isFlushScheduledAtom,
    webObjectPendingMethodResponsesAtom,
    webObjectsListenersAtom,
    mapSourcesListenersAtom,

    enqueueMessageAtom,
    dispatchMessageAtom,
    flushMessagesAtom,

    setWebObjectPendingMethodResponseAtom,
    resolveWebObjectPendingMethodResponseAtom,
    deleteWebObjectPendingMethodResponseAtom,

    setWebObjectListenersAtom,
    getWebObjectListenersAtom,
    deleteWebObjectListenersAtom,

    setMapSourceListenersAtom,
    getMapSourceListenersAtom,
    deleteMapSourceListenersAtom,
  } as const
})()

export const mapAtomsList = Object.values(mapAtoms)
