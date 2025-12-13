import { forwardRef, useId } from 'react'
import type { WebObjectType } from 'react-native-maplibre-gl-js/communication/messages.types'
import type {
  InferWebObjectMethods,
  InferWebObjectOptions,
  PropsOfWebObject,
  WebObjectListeners,
} from 'react-native-maplibre-gl-js/react-native/components-factory/createWebObjectAsComponent.types'
import useWebObjectMountOnLaunch from 'react-native-maplibre-gl-js/react-native/components-factory/hooks/useWebObjectMountOnLaunch'
import useWebObjectMethodsProxy from 'react-native-maplibre-gl-js/react-native/components-factory/hooks/useWebObjectMethodsProxy'

const createWebObjectAsComponent = <
  Options extends InferWebObjectOptions<any>,
  Methods extends InferWebObjectMethods<object>,
  Listener extends WebObjectListeners,
>(
  objectType: WebObjectType,
) => {
  return forwardRef<Methods, PropsOfWebObject<Options, Listener>>(
    (props, ref) => {
      // UID of the web object.
      const id = useId()
      // Mount the web object on launch.
      useWebObjectMountOnLaunch<PropsOfWebObject<Options, Listener>>(
        props,
        id,
        objectType,
      )
      // Forward a method call on the RN object to the web object.
      useWebObjectMethodsProxy<Methods>(ref, id)
      // TODO needed?
      //useWebObjectOptionsUpdater<Options, Listener>(
      //  props, id, dispatchMessage
      //)

      return null
    },
  )
}
export default createWebObjectAsComponent
