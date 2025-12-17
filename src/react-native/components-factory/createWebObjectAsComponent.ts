import { forwardRef, useId } from 'react'
import type {
  WebObjectComponent,
  WebObjectProps,
  WebObjectRef,
} from './createWebObjectAsComponent.types'
import type { WebObjectType } from '../../communication/messages.types'
import useWebObjectMountOnLaunch from './hooks/useWebObjectMountOnLaunch'
import useWebObjectMethodsProxy from './hooks/useWebObjectMethodsProxy'

const createWebObjectAsComponent = <
  Ref extends WebObjectRef<any>,
  Props extends WebObjectProps<any, any>,
>(
  objectType: WebObjectType,
): WebObjectComponent<Ref, Props> => {
  return forwardRef<Ref, Props>((props, ref) => {
    // UID of the web object.
    const id = useId()
    // Mount the web object on launch.
    useWebObjectMountOnLaunch<Props>(props, id, objectType)
    // Forward a method call on the RN object to the web object.
    useWebObjectMethodsProxy<Ref>(ref, id)
    // TODO needed?
    //useWebObjectOptionsUpdater<Options, Listener>(
    //  props, id, dispatchMessage
    //)

    return null
  })
}

export default createWebObjectAsComponent
