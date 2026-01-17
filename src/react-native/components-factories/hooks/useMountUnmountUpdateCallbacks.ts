import { useCallback } from 'react'
import type { MountUpdateUnmountInput } from './useMountUnmountUpdateCallbacks.types'
import useMapAtoms from '../../hooks/atoms/useMapAtoms'

/**
 * @param input - The RN object props, etc.
 * @returns – The callbacks used to mount, update and unmount the web object /
 *  map source and its listeners.
 */
const useMountUnmountUpdateCallbacks = (input: MountUpdateUnmountInput) => {
  // States.
  // - Global.
  const {
    dispatchMessage,
    setWebObjectListeners,
    deleteWebObjectListeners,
    setMapSourceListeners,
    deleteMapSourceListeners,
  } = useMapAtoms()

  const mount = useCallback(() => {
    switch (input.type) {
      case 'webObject': {
        dispatchMessage({
          type: `webObjectMount`,
          payload: {
            options: input.props.options,
            listeners: input.props.listeners,
            objectId: input.objectId,
            objectType: input.objectType,
          },
        })
        setWebObjectListeners({
          objectId: input.objectId,
          listeners: input.props.listeners ?? {},
        })
        break
      }
      case 'mapSource': {
        dispatchMessage({
          type: `mapSourceMount`,
          payload: input.props,
        })
        setMapSourceListeners({
          sourceId: input.props.id,
          listeners:
            input.props.layers
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
        break
      }
    }
  }, [input, dispatchMessage, setWebObjectListeners, setMapSourceListeners])

  const update = useCallback(() => {
    switch (input.type) {
      case 'webObject': {
        dispatchMessage({
          type: `webObjectUpdate`,
          payload: {
            options: input.props.options,
            listeners: input.props.listeners,
            objectId: input.objectId,
            objectType: input.objectType,
          },
        })
        setWebObjectListeners({
          objectId: input.objectId,
          listeners: input.props.listeners ?? {},
        })
        break
      }
      case 'mapSource': {
        dispatchMessage({
          type: `mapSourceUpdate`,
          payload: input.props,
        })
        setMapSourceListeners({
          sourceId: input.props.id,
          listeners:
            input.props.layers
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
        break
      }
    }
  }, [input, dispatchMessage, setWebObjectListeners, setMapSourceListeners])

  const unmount = useCallback(() => {
    switch (input.type) {
      case 'webObject': {
        dispatchMessage({
          type: `webObjectUnmount`,
          payload: { objectId: input.objectId },
        })
        deleteWebObjectListeners({ objectId: input.objectId })
        break
      }
      case 'mapSource': {
        dispatchMessage({
          type: `mapSourceUnmount`,
          payload: { sourceId: input.props.id },
        })
        deleteMapSourceListeners({ sourceId: input.props.id })
        break
      }
    }
  }, [
    input,
    dispatchMessage,
    deleteWebObjectListeners,
    deleteMapSourceListeners,
  ])

  return { mount, update, unmount }
}

export default useMountUnmountUpdateCallbacks
