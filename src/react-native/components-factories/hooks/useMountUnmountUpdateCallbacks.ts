import { useCallback } from 'react'
import type { MountUpdateUnmountInput } from './useMountUnmountUpdateCallbacks.types'
import useMapAtoms from '../../hooks/atoms/useMapAtoms'
import { useStableValue } from './useMountUnmountUpdateCallbacks.utils'
import {
  extractHTMLElementListenersFromOptions,
  removeHTMLElementListeners,
} from '../../../communication/messages.utils'

/**
 * @param input - The RN object props, etc.
 * @returns – The callbacks used to mount, update, and unmount the web object /
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
  // Behaviors.
  const stableInput = useStableValue(input)

  const mount = useCallback(() => {
    switch (stableInput.type) {
      case 'webObject': {
        dispatchMessage({
          type: `webObjectMount`,
          payload: {
            options: removeHTMLElementListeners(
              stableInput.props.options,
              stableInput.optionsThatAreHTMLElements,
            ),
            listeners: stableInput.props.listeners,
            objectId: stableInput.objectId,
            objectType: stableInput.objectType,
          },
        })
        setWebObjectListeners({
          objectId: stableInput.objectId,
          listeners: {
            ...(stableInput.props.listeners ?? {}),
            ...extractHTMLElementListenersFromOptions(
              stableInput.props.options,
              stableInput.optionsThatAreHTMLElements,
            ),
          },
        })
        break
      }
      case 'mapSource': {
        dispatchMessage({
          type: `mapSourceMount`,
          payload: stableInput.props,
        })
        setMapSourceListeners({
          sourceId: stableInput.props.id,
          listeners:
            stableInput.props.layers
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
  }, [
    stableInput,
    dispatchMessage,
    setWebObjectListeners,
    setMapSourceListeners,
  ])

  const update = useCallback(() => {
    switch (stableInput.type) {
      case 'webObject': {
        dispatchMessage({
          type: `webObjectUpdate`,
          payload: {
            options: stableInput.props.options,
            listeners: stableInput.props.listeners,
            objectId: stableInput.objectId,
            objectType: stableInput.objectType,
          },
        })
        setWebObjectListeners({
          objectId: stableInput.objectId,
          listeners: stableInput.props.listeners ?? {},
        })
        break
      }
      case 'mapSource': {
        dispatchMessage({
          type: `mapSourceUpdate`,
          payload: stableInput.props,
        })
        setMapSourceListeners({
          sourceId: stableInput.props.id,
          listeners:
            stableInput.props.layers
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
  }, [
    stableInput,
    dispatchMessage,
    setWebObjectListeners,
    setMapSourceListeners,
  ])

  const unmount = useCallback(() => {
    switch (stableInput.type) {
      case 'webObject': {
        dispatchMessage({
          type: `webObjectUnmount`,
          payload: { objectId: stableInput.objectId },
        })
        deleteWebObjectListeners({ objectId: stableInput.objectId })
        break
      }
      case 'mapSource': {
        dispatchMessage({
          type: `mapSourceUnmount`,
          payload: { sourceId: stableInput.props.id },
        })
        deleteMapSourceListeners({ sourceId: stableInput.props.id })
        break
      }
    }
  }, [
    stableInput,
    dispatchMessage,
    deleteWebObjectListeners,
    deleteMapSourceListeners,
  ])

  return { mount, update, unmount }
}

export default useMountUnmountUpdateCallbacks
