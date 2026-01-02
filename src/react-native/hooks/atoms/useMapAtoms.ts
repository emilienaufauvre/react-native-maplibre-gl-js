import { useAtom, useSetAtom } from 'jotai'
import { mapAtoms } from './mapAtoms'

const useMapAtoms = () => {
  const [webView, setWebView] = useAtom(mapAtoms.webViewAtom)
  const [isWebWorldReady, setIsWebWorldReady] = useAtom(
    mapAtoms.isWebWorldReadyAtom,
  )
  const [isMapMountMessageReady] = useAtom(mapAtoms.isMapMountMessageReadyAtom)

  return {
    webView,
    setWebView,
    isWebWorldReady,
    setIsWebWorldReady,
    isMapMountMessageReady,

    enqueueMessage: useSetAtom(mapAtoms.enqueueMessageAtom),
    dispatchMessage: useSetAtom(mapAtoms.dispatchMessageAtom),
    flushMessages: useSetAtom(mapAtoms.flushMessagesAtom),

    setWebObjectPendingMethodResponse: useSetAtom(
      mapAtoms.setWebObjectPendingMethodResponseAtom,
    ),
    resolveWebObjectPendingMethodResponse: useSetAtom(
      mapAtoms.resolveWebObjectPendingMethodResponseAtom,
    ),
    deleteWebObjectPendingMethodResponse: useSetAtom(
      mapAtoms.deleteWebObjectPendingMethodResponseAtom,
    ),

    setWebObjectListeners: useSetAtom(mapAtoms.setWebObjectListenersAtom),
    getWebObjectListeners: useSetAtom(mapAtoms.getWebObjectListenersAtom),
    deleteWebObjectListeners: useSetAtom(mapAtoms.deleteWebObjectListenersAtom),

    setMapSourceListeners: useSetAtom(mapAtoms.setMapSourceListenersAtom),
    getMapSourceListeners: useSetAtom(mapAtoms.getMapSourceListenersAtom),
    deleteMapSourceListeners: useSetAtom(mapAtoms.deleteMapSourceListenersAtom),
  }
}

export default useMapAtoms
