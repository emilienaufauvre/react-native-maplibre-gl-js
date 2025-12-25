import { useCallback } from 'react'
import useMapAtoms from '../../../hooks/atoms/useMapAtoms'
import type { MapSourceProps } from '../createMapSourceAsComponent.types'

/**
 * @param props - The RN object props.
 * @returns – The callbacks used to mount, update and unmount the map source and
 *  its listeners.
 */
const useMapSourceMountUnmountUpdateCallbacks = <
  Props extends MapSourceProps<any>,
>(
  props: Props,
) => {
  // States.
  // - Global.
  const { dispatchMessage, setMapSourceListeners, deleteMapSourceListeners } =
    useMapAtoms()

  const mount = useCallback(() => {
    dispatchMessage({
      type: `mapSourceMount`,
      payload: props,
    })
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
  }, [props, dispatchMessage, setMapSourceListeners])

  const update = useCallback(() => {
    dispatchMessage({
      type: `mapSourceUpdate`,
      payload: props,
    })
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
  }, [props, dispatchMessage, setMapSourceListeners])

  const unmount = useCallback(() => {
    dispatchMessage({
      type: `mapSourceUnmount`,
      payload: { sourceId: props.id },
    })
    deleteMapSourceListeners({ sourceId: props.id })
  }, [deleteMapSourceListeners, dispatchMessage, props.id])

  return { mount, update, unmount }
}

export default useMapSourceMountUnmountUpdateCallbacks
