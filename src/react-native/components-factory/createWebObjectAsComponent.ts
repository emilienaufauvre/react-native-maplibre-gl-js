import { forwardRef, useId } from 'react'
import type { WebObjectType } from '@ml/communication/messages.types'
import type {
  WebObjectProps,
  WebObjectComponent,
  WebObjectRef,
} from '@ml/react-native/components-factory/createWebObjectAsComponent.types'
import useWebObjectMountOnLaunch from '@ml/react-native/components-factory/hooks/useWebObjectMountOnLaunch'
import useWebObjectMethodsProxy from '@ml/react-native/components-factory/hooks/useWebObjectMethodsProxy'

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
