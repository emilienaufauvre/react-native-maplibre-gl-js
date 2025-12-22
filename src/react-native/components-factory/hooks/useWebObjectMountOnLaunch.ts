import { type PropsWithoutRef, useEffect } from 'react'
import type { WebObjectProps } from '../createWebObjectAsComponent.types'
import type { MountUnmountCallbacksOptions } from './useWebObjectMountUnmountCallbacks.types'

/**
 * Mount and unmount the web object once the React Native one is mounted /
 * unmounted.
 * @param props - The RN object props.
 * @param objectId - The ID of the web object that owns the method.
 * @param mount - Callback.
 * @param unmount - Callback.
 */
const useWebObjectMountOnLaunch = <Props extends WebObjectProps<any, any>>(
  props: PropsWithoutRef<Props>,
  objectId: string,
  mount: (options?: MountUnmountCallbacksOptions) => void,
  unmount: (options?: MountUnmountCallbacksOptions) => void,
) => {
  // On mount/unmount, do the same for the web object.
  useEffect(() => {
    mount()
    // TODO verify if we unmount here? it sure that it must not be in this
    //  use effect, otherwise on start if mount then unmount then mount, but
    //  we may have to unmount in another effect
    //return unmount()
  }, [objectId, props, mount, unmount])
}

export default useWebObjectMountOnLaunch
