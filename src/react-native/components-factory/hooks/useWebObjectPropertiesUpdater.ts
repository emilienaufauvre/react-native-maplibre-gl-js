import type { WebObjectProps } from '../createWebObjectAsComponent.types'
import { useEffect } from 'react'

export const useWebObjectPropertiesUpdater = <
  Props extends WebObjectProps<any, any>,
>(
  props: Props,
  id: string,
) => {
  // Refs.
  //const previousProps = useRef<Record<string, any>>({})

  useEffect(() => {
    // TODO compare previous and new props and update only if new.
    return
  }, [id, props])
}

export default useWebObjectPropertiesUpdater
