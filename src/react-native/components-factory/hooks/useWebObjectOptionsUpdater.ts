import { useEffect } from 'react'
import type { WebObjectType } from 'react-native-maplibre-gl-js/communication/messages.types'
import type {
  WebObjectOptionsInferred,
  WebObjectProps,
  WebObjectListeners,
} from 'react-native-maplibre-gl-js/react-native/components-factory/createWebObjectAsComponent.types'

export const useWebObjectOptionsUpdater = <
  Options extends WebObjectOptionsInferred<WebObjectType>,
  Listeners extends WebObjectListeners,
>(
  props: WebObjectProps<Options, Listeners>,
  id: string,
  dispatchMessage: (msg: any) => void,
) => {
  // Refs.
  //const previousProps = useRef<Record<string, any>>({})

  useEffect(() => {
    // TODO compare previous and new props and update only if new.
    dispatchMessage({
      type: 'webObjectOptionsUpdate',
      payload: { id, options: props.options },
    })
  }, [id, dispatchMessage, props])
}

export default useWebObjectOptionsUpdater
