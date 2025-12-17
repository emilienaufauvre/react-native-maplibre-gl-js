import { useEffect } from 'react'
import type {
  WebObjectListeners,
  WebObjectOptionsInferred,
  WebObjectProps,
} from '../createWebObjectAsComponent.types'
import type { WebObjectType } from '../../../communication/messages.types'

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
