import type {
  WebObjectProps,
  WebObjectType,
} from '../createWebObjectAsComponent.types'
import { type PropsWithoutRef, useCallback, useRef } from 'react'
import useMapAtoms from '../../hooks/atoms/useMapAtoms'
import type { MountUnmountCallbacksOptions } from './useWebObjectMountUnmountCallbacks.types'

/**
 * @param props - The RN object props.
 * @param objectId - The ID of the web object that owns the method.
 * @param objectType - The type of the associated web object.
 * @returns – The callbacks used to mount and unmount the web object. They
 *  internally handle edge cases where execution must be prevented, with no
 *  external management required. They allow (un)mounting the web objects with
 *  their options, but also their listeners.
 */
const useWebObjectMountUnmountCallbacks = <
  Props extends WebObjectProps<any, any>,
>(
  props: PropsWithoutRef<Props>,
  objectId: string,
  objectType: WebObjectType,
) => {
  // Refs.
  const areOptionsMounted = useRef<boolean>(false)
  const areListenersMounted = useRef<boolean>(false)
  // States.
  // - Global.
  const { dispatchMessage, setWebObjectListeners, deleteWebObjectListeners } =
    useMapAtoms()

  const mount = useCallback(
    ({
      options = true,
      listeners = true,
    }: MountUnmountCallbacksOptions = {}) => {
      // Mount the component as a web object within the web world.
      if (options && !areOptionsMounted.current) {
        dispatchMessage({
          type: `webObjectMount`,
          payload: {
            objectId: objectId,
            objectType,
            options: props.options ?? {},
            listeners: props.listeners ?? {},
          },
        })
        areOptionsMounted.current = true
      }
      // Register listeners on event from the web world.
      if (listeners && !areListenersMounted.current) {
        setWebObjectListeners({
          objectId: objectId,
          listeners: props.listeners ?? {},
        })
        areListenersMounted.current = true
      }
    },
    [
      objectId,
      objectType,
      props.options,
      props.listeners,
      dispatchMessage,
      setWebObjectListeners,
    ],
  )

  const unmount = useCallback(
    ({
      options = true,
      listeners = true,
    }: MountUnmountCallbacksOptions = {}) => {
      // Mount the component as a web object within the web world.
      if (options && areOptionsMounted.current) {
        dispatchMessage({
          type: `webObjectUnmount`,
          payload: { objectId },
        })
        areOptionsMounted.current = false
      }
      // Register listeners on event from the web world.
      if (listeners && areListenersMounted.current) {
        deleteWebObjectListeners({ objectId })
        areListenersMounted.current = false
      }
    },
    [objectId, dispatchMessage, deleteWebObjectListeners],
  )

  return { mount, unmount }
}

export default useWebObjectMountUnmountCallbacks
