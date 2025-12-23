import { forwardRef, useId } from 'react'
import type {
  WebObjectComponent,
  WebObjectProps,
  WebObjectRef,
} from './createWebObjectAsComponent.types'
import type { WebObjectType } from '../../communication/messages.types'
import useWebObjectMethodsProxy from './hooks/useWebObjectMethodsProxy'
import useWebObjectMountUnmountWithProps from './hooks/useWebObjectMountUnmountWithProps'

const createWebObjectAsComponent = <
  Ref extends WebObjectRef<any>,
  Props extends WebObjectProps<any, any>,
>(
  objectType: WebObjectType,
): WebObjectComponent<Ref, Props> => {
  return forwardRef<Ref, Props>((props, ref) => {
    // UID of the web object.
    const id = useId()
    // Forward a method call on the RN object ref to the web object.
    useWebObjectMethodsProxy<Ref>(ref, id)
    // Mount the web object on launch and update the web object properties when
    // they changed in the component body.
    useWebObjectMountUnmountWithProps<Props>(props, id, objectType)

    return null
  })
}

export default createWebObjectAsComponent
