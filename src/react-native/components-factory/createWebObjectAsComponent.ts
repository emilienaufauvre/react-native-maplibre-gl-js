import { forwardRef, useId } from 'react'
import type {
  WebObjectComponent,
  WebObjectProps,
  WebObjectRef,
} from './createWebObjectAsComponent.types'
import type { WebObjectType } from '../../communication/messages.types'
import useWebObjectMountOnLaunch from './hooks/useWebObjectMountOnLaunch'
import useWebObjectMethodsProxy from './hooks/useWebObjectMethodsProxy'
import useWebObjectPropertiesUpdater from './hooks/useWebObjectPropertiesUpdater'
import useWebObjectMountUnmountCallbacks from './hooks/useWebObjectMountUnmountCallbacks'

const createWebObjectAsComponent = <
  Ref extends WebObjectRef<any>,
  Props extends WebObjectProps<any, any>,
>(
  objectType: WebObjectType,
): WebObjectComponent<Ref, Props> => {
  return forwardRef<Ref, Props>((props, ref) => {
    // UID of the web object.
    const id = useId()
    // Callbacks to mount and unmount the web object.
    const { mount, unmount } = useWebObjectMountUnmountCallbacks(
      props,
      id,
      objectType,
    )
    // Mount the web object on launch.
    useWebObjectMountOnLaunch<Props>(props, id, mount, unmount)
    // Forward a method call on the RN object to the web object.
    useWebObjectMethodsProxy<Ref>(ref, id)
    // Update the web object properties when they changed in the component body.
    useWebObjectPropertiesUpdater<Props>(props, mount, unmount)

    return null
  })
}

export default createWebObjectAsComponent
