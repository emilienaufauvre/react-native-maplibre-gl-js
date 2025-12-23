import type { WebObjectProps } from '../createWebObjectAsComponent.types'
import { type PropsWithoutRef, useEffect, useMemo, useRef } from 'react'
import { stableStringify } from '../../hooks/atoms/useMapAtoms.utils'
import type { MountUnmountCallbacksOptions } from './useWebObjectMountUnmountCallbacks.types'

/**
 * Propagate any change in the component props to the web world, by unmounting
 * and mounting the web object with the new options.
 * @param props - The RN object props.
 * @param mount - Callback.
 * @param unmount - Callback.
 */
export const useWebObjectPropertiesUpdater = <
  Props extends WebObjectProps<any, any>,
>(
  props: PropsWithoutRef<Props>,
  mount: (options?: MountUnmountCallbacksOptions) => void,
  unmount: (options?: MountUnmountCallbacksOptions) => void,
) => {
  // Refs.
  const optionsAsStringPrevious = useRef<string | undefined>(undefined)

  const optionsAsString = useMemo(() => stableStringify(props.options), [props])

  // Mount options only when they have changed (mounted in the web world).
  // Listeners are always mounted: they are inexpensive (mounted in the RN
  // world) and cannot be reliably compared when declared inline in the
  // component, as they change on every render.
  useEffect(() => {
    const areOptionsEqual = optionsAsStringPrevious.current === optionsAsString
    unmount({ options: !areOptionsEqual, listeners: true })
    mount({ options: !areOptionsEqual, listeners: true })
    optionsAsStringPrevious.current = optionsAsString
  }, [
    mount,
    unmount,
    optionsAsStringPrevious,
    optionsAsString,
    props.listeners,
  ])
}

export default useWebObjectPropertiesUpdater
