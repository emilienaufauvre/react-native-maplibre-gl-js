import { atom, useSetAtom } from 'jotai'
import type { WebView } from 'react-native-webview'
import { useAtom } from 'jotai'
import type { MessageFromRNToWeb } from '../../../communication/messages.types'
import type {
  WebObjectId,
  WebObjectListeners,
  WebObjectMethodCallRequestId,
} from '../../components-factories/web-objects/createWebObjectAsComponent.types'
import { stableStringify } from './useMapAtoms.utils'
import type {
  MapSourceId,
  MapSourceLayerId,
  MapSourceLayerListeners,
} from '../../components-factories/map-sources/createMapSourceAsComponent.types'

/**
 * The WebView used to render `MapLibre GL JS` views (the web world).
 */
const webViewAtom = atom<WebView | null>(null)

/**
 * True if the WebView is ready to be used.
 */
const isWebWorldReadyAtom = atom(false)

/**
 * True if the mount message of the map component is ready to be sent to the web
 * world.
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
 * When a method is invoked on a RN object, the call is forwarded to the native
 * method within the web world. The pending responses are stored within this
 * Map.
 */
const webObjectPendingMethodResponses = atom<
  Map<string, (result: any) => void>
>(new Map())

/**
 * The callbacks registered to react to web objects events.
 */
export const webObjectsListenersAtom = atom<Map<string, WebObjectListeners>>(
  new Map(),
)

/**
 * The callbacks registered to react to map sources layers events.
 */
export const mapSourcesListenersAtom = atom<
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
    const isMapMountMessageDispatched = get(isMapMountMessageDispatchedAtom)
    const webView = get(webViewAtom)

    const isMapMountMessage =
      message.type === 'webObjectMount' && message.payload.objectType === 'map'

    if (
      !isWebWorldReady ||
      !isMapMountMessageReady ||
      !isMapMountMessageDispatched ||
      !webView
    ) {
      const q = get(messageQueueAtom)
      if (isMapMountMessage) {
        // Map mount message must be sent before any other message.
        set(messageQueueAtom, [message, ...q])
        // If the map mount message was queued in priority, then others messages
        // are allowed to be sent.
        set(isMapMountMessageReadyAtom, true)
      } else {
        set(messageQueueAtom, [...q, message])
      }
      return
    }

    webView.postMessage(stableStringify(message))
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

  messageQueue.forEach((message) => {
    webView.postMessage(stableStringify(message))
  })

  set(messageQueueAtom, [])

  // Mark the map mount message as dispatched if it was not.
  if (!isMapMountMessageDispatched) {
    set(isMapMountMessageDispatchedAtom, true)
  }
})

/**
 * Register a promise resolver associated with a pending response to a web world
 * native object method call.
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
    const map = new Map(get(webObjectPendingMethodResponses))
    map.set(requestId, resolve)
    set(webObjectPendingMethodResponses, map)
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
    const map = new Map(get(webObjectPendingMethodResponses))
    const resolver = map.get(requestId)
    if (resolver) {
      resolver(result)
      map.delete(requestId)
      set(webObjectPendingMethodResponses, map)
    }
  },
)

/**
 * Delete a pending call to a web object method.
 */
const deleteWebObjectPendingMethodResponseAtom = atom(
  null,
  (get, set, requestId: WebObjectMethodCallRequestId) => {
    const map = new Map(get(webObjectPendingMethodResponses))
    map.delete(requestId)
    set(webObjectPendingMethodResponses, map)
  },
)

/**
 * Set the callbacks to be executed when receiving an event of a specific native
 * web object.
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
  (
    get,
    _set,
    { objectId }: { objectId: WebObjectId },
  ): WebObjectListeners | undefined => {
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
 * Set the callbacks to be executed when receiving an event of a specific native
 * map source layer.
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
    { sourceId, layerId }: { sourceId: MapSourceId; layerId: MapSourceLayerId },
  ): MapSourceLayerListeners | undefined => {
    const map = get(mapSourcesListenersAtom)
    return map.get(sourceId)?.filter((item) => item.layerId === layerId)[0]
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

const useMapAtoms = () => {
  const [webView, setWebView] = useAtom(webViewAtom)
  const [isWebWorldReady, setIsWebWorldReady] = useAtom(isWebWorldReadyAtom)
  const [isMapMountMessageReady] = useAtom(isMapMountMessageReadyAtom)

  return {
    // Raw atoms.
    webView,
    setWebView,
    isWebWorldReady,
    setIsWebWorldReady,
    isMapMountMessageReady,
    // Messages for the web world.
    enqueueMessage: useSetAtom(enqueueMessageAtom),
    dispatchMessage: useSetAtom(dispatchMessageAtom),
    flushMessages: useSetAtom(flushMessagesAtom),
    // Pending responses from the web world on object method calls.
    setWebObjectPendingMethodResponse: useSetAtom(
      setWebObjectPendingMethodResponseAtom,
    ),
    resolveWebObjectPendingMethodResponse: useSetAtom(
      resolveWebObjectPendingMethodResponseAtom,
    ),
    deleteWebObjectPendingMethodResponse: useSetAtom(
      deleteWebObjectPendingMethodResponseAtom,
    ),
    // Callbacks to be executed on web world event issued by an object.
    setWebObjectListeners: useSetAtom(setWebObjectListenersAtom),
    getWebObjectListeners: useSetAtom(getWebObjectListenersAtom),
    deleteWebObjectListeners: useSetAtom(deleteWebObjectListenersAtom),
    // Callbacks to be executed on web world event issued by a source layer.
    setMapSourceListeners: useSetAtom(setMapSourceListenersAtom),
    getMapSourceListeners: useSetAtom(getMapSourceListenersAtom),
    deleteMapSourceListeners: useSetAtom(deleteMapSourceListenersAtom),
  }
}

export default useMapAtoms
