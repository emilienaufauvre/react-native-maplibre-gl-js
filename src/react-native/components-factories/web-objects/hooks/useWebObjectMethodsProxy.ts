import {
  type ForwardedRef,
  useCallback,
  useImperativeHandle,
  useMemo,
} from 'react'
import type {
  WebObjectId,
  WebObjectMethodCallRequestId,
  WebObjectRef,
} from '../createWebObjectAsComponent.types'
import useMapAtoms from '../../../hooks/atoms/useMapAtoms'

/**
 * Create a proxy to call the methods of the corresponding web world object,
 * then expose it as the given `ref`.
 * @param ref - A React ref object that will be updated to point to the web
 *  methods proxy.
 * @param objectId - The ID of the web object that owns the method.
 */
export const useWebObjectMethodsProxy = <Ref extends WebObjectRef<any>>(
  ref: ForwardedRef<Ref>,
  objectId: WebObjectId,
) => {
  // States.
  // - Global.
  const { dispatchMessage, setWebObjectPendingMethodResponse } = useMapAtoms()

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
              // TODO generator.
              const requestId: WebObjectMethodCallRequestId = Math.random()
                .toString(36)
                .slice(2, 11)
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
  }, [objectId, dispatchMessage, setWebObjectPendingMethodResponse])

  const methodsProxy = useMemo(() => createProxy(), [createProxy])
  // Expose the web methods as the component methods.
  useImperativeHandle(ref, () => methodsProxy)
}

export default useWebObjectMethodsProxy
