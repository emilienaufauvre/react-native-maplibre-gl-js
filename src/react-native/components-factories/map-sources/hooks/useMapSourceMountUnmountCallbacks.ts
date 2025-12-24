import { useCallback, useRef } from 'react'
import useMapAtoms from '../../../hooks/atoms/useMapAtoms'
import type { MapSourceProps } from '../createMapSourceAsComponent.types'

/**
 * @param props - The RN object props.
 * @param objectId - The ID of the web object that owns the method.
 * @param objectType - The type of the associated web object.
 * @returns – The callbacks used to mount and unmount the web object. They
 *  internally handle edge cases where execution must be prevented, with no
 *  external management required. They allow (un)mounting the web objects with
 *  their options, but also their listeners.
 */
const useMapSourceMountUnmountCallbacks = <Props extends MapSourceProps<any>>(
  props: Props,
) => {
  // Refs.
  const areOptionsMounted = useRef<boolean>(false)
  //const areListenersMounted = useRef<boolean>(false)
  // States.
  // - Global.
  const { dispatchMessage } = useMapAtoms()

  const mount = useCallback(() => {
    // Mount the component as a map source within the web world.
    if (!areOptionsMounted.current) {
      dispatchMessage({
        type: `mapSourceMount`,
        payload: props,
      })
      areOptionsMounted.current = true
    }
    // Register listeners on event from the web world.
    /**
    if (listeners && !areListenersMounted.current) {
      setWebObjectListeners({
        objectId: objectId,
        listeners: props.listeners ?? {},
      })
      areListenersMounted.current = true
    }
     */
  }, [props, dispatchMessage])

  const unmount = useCallback(() => {
    // Mount the component as a map source within the web world.
    if (areOptionsMounted.current) {
      dispatchMessage({
        type: `mapSourceUnmount`,
        payload: { sourceId: props.id },
      })
      areOptionsMounted.current = false
    }
    // Register listeners on event from the web world.
    /**
    if (areListenersMounted.current) {
      deleteWebObjectListeners({ objectId })
      areListenersMounted.current = false
    }
     */
  }, [dispatchMessage, props.id])

  return { mount, unmount }
}

export default useMapSourceMountUnmountCallbacks
