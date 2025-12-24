import { useCallback, useRef } from 'react'
import useMapAtoms from '../../../hooks/atoms/useMapAtoms'
import type { MapSourceProps } from '../createMapSourceAsComponent.types'

/**
 * @param props - The RN object props.
 * @returns – The callbacks used to mount and unmount the map source. They
 *  internally handle edge cases where execution must be prevented, with no
 *  external management required. They allow (un)mounting the map sources with
 *  their options, but also their listeners.
 */
const useMapSourceMountUnmountCallbacks = <Props extends MapSourceProps<any>>(
  props: Props,
) => {
  // Refs.
  const areOptionsMounted = useRef<boolean>(false)
  const areListenersMounted = useRef<boolean>(false)
  // States.
  // - Global.
  const { dispatchMessage, setMapSourceListeners, deleteMapSourceListeners } =
    useMapAtoms()

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
    if (!areListenersMounted.current) {
      setMapSourceListeners({
        sourceId: props.id,
        listeners:
          props.layers
            .map((item) =>
              item.listeners
                ? {
                    layerId: item.layer.id,
                    listeners: item.listeners,
                  }
                : undefined,
            )
            .filter((item) => item !== undefined) ?? [],
      })
      areListenersMounted.current = true
    }
  }, [props, dispatchMessage, setMapSourceListeners])

  const unmount = useCallback(() => {
    // Unmount the component.
    if (areOptionsMounted.current) {
      dispatchMessage({
        type: `mapSourceUnmount`,
        payload: { sourceId: props.id },
      })
      areOptionsMounted.current = false
    }
    // Unregister listeners on event from the web world.
    if (areListenersMounted.current) {
      deleteMapSourceListeners({ sourceId: props.id })
      areListenersMounted.current = false
    }
  }, [deleteMapSourceListeners, dispatchMessage, props.id])

  return { mount, unmount }
}

export default useMapSourceMountUnmountCallbacks
