import {
  type ForwardedRef,
  useCallback,
  useImperativeHandle,
  useMemo,
} from 'react'
import type {
  WebObjectId,
  WebObjectRef,
} from '../web-objects/createWebObjectAsComponent.types'
import useMapAtoms from '../../hooks/atoms/useMapAtoms'
import { extractHTMLElementListenersFromMethodArgs } from './useMountUnmountUpdateCallbacks.utils'
import { genRequestId } from './useWebObjectMethodsProxy.utils'

/**
 * Create a proxy to call the methods of the corresponding web world object,
 * then expose it as the given `ref`.
 * @param ref - A React ref object that will be updated to point to the web
 *  methods proxy.
 * @param objectId - The ID of the web object that owns the method.
 * @param methodsThatContainHTMLElements - The methods that contain
 *  HTMLElements.
 */
export const useWebObjectMethodsProxy = <Ref extends WebObjectRef<any>>(
  ref: ForwardedRef<Ref>,
  objectId: WebObjectId,
  methodsThatContainHTMLElements: readonly string[],
) => {
  // States.
  // - Global.
  const {
    dispatchMessage,
    setWebObjectPendingMethodResponse,
    updateWebObjectListeners,
  } = useMapAtoms()

  const createProxy = useCallback((): Ref => {
    return new Proxy(
      {},
      {
        get(_, propKey) {
          if (propKey === 'getId') {
            return () => objectId
          }
          return (...args: any[]) => {
            return new Promise((resolve) => {
              const requestId = genRequestId()
              // Update the listeners of the HTMLElements if needed.
              if (methodsThatContainHTMLElements.includes(propKey as string)) {
                updateWebObjectListeners({
                  objectId,
                  newListeners: extractHTMLElementListenersFromMethodArgs(args),
                })
              }
              // Store the resolver as a pending response.
              setWebObjectPendingMethodResponse({ requestId, resolve })
              // Send the method call message to the WebView.
              dispatchMessage({
                type: 'webObjectMethodCall',
                payload: {
                  requestId,
                  objectId,
                  method: propKey as string,
                  args,
                },
              })
            })
          }
        },
      },
    ) as Ref
  }, [
    objectId,
    methodsThatContainHTMLElements,
    setWebObjectPendingMethodResponse,
    dispatchMessage,
    updateWebObjectListeners,
  ])

  const methodsProxy = useMemo(() => createProxy(), [createProxy])
  // Expose the web methods as the component methods.
  useImperativeHandle(ref, () => methodsProxy)
}

export default useWebObjectMethodsProxy
