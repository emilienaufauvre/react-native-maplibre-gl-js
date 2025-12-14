import { type PropsWithoutRef, useCallback, useEffect, useRef } from 'react'
import useMapAtoms from 'react-native-maplibre-gl-js/react-native/hooks/atoms/useMapAtoms'
import type { WebObjectType } from 'react-native-maplibre-gl-js/communication/messages.types'
import type { WebObjectProps } from 'react-native-maplibre-gl-js/react-native/components-factory/createWebObjectAsComponent.types'

/**
 * Mount the web object once the React Native one is mounted.
 * @param props - The RN object props.
 * @param objectId - The ID of the web object that owns the method.
 * @param objectType - The type of the associated web object.
 */
const useWebObjectMountOnLaunch = <Props extends WebObjectProps<any, any>>(
  props: PropsWithoutRef<Props>,
  objectId: string,
  objectType: WebObjectType,
) => {
  // Refs.
  const isMounted = useRef<boolean>(false)
  // States.
  // - Global.
  const {
    isWebWorldReady,
    dispatchMessage,
    setWebObjectListeners,
    deleteWebObjectListeners,
  } = useMapAtoms()

  const mount = useCallback(() => {
    // Mount the component as a web object on the web world.
    dispatchMessage({
      type: `webObjectMount`,
      payload: {
        objectId: objectId,
        objectType,
        options: props.options ?? {},
        listeners: props.listeners ?? {},
      },
    })
    // Register listeners on event from the web world.
    setWebObjectListeners({
      objectId: objectId,
      listeners: props.listeners ?? {},
    })
    isMounted.current = true
  }, [
    objectId,
    objectType,
    props.options,
    props.listeners,
    dispatchMessage,
    setWebObjectListeners,
  ])

  const unmount = useCallback(() => {
    dispatchMessage({
      type: `webObjectUnmount`,
      payload: { objectId },
    })
    deleteWebObjectListeners({ objectId })
    isMounted.current = false
  }, [objectId, dispatchMessage, deleteWebObjectListeners])

  // On mount/unmount update the web object.
  useEffect(() => {
    if (!isWebWorldReady) {
      return
    }

    if (!isMounted.current) {
      mount()
    }
    // TODO verify if we unmount here? it sure that it must not be in this
    //  use effect, otherwise on start if mount then unmount then mount, but
    //  we may have to unmount in another effect
    //return unmount
  }, [objectId, isWebWorldReady, dispatchMessage, props, unmount, mount])
}

export default useWebObjectMountOnLaunch
