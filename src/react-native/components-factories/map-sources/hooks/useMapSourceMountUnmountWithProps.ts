import { useEffect, useMemo, useRef } from 'react'
import { stableStringify } from '../../../hooks/atoms/useMapAtoms.utils'
import useMapAtoms from '../../../hooks/atoms/useMapAtoms'
import type { MapSourceProps } from '../createMapSourceAsComponent.types'
import useMapSourceMountUnmountCallbacks from './useMapSourceMountUnmountCallbacks'

/**
 * Mount the component as a map source within the web world on component mount.
 * Propagate any change in the component props to the web world by unmounting
 * and mounting the map source with the new options.
 * @param props - The RN object props.
 */
export const useMapSourceMountUnmountWithProps = <
  Props extends MapSourceProps<any>,
>(
  props: Props,
) => {
  // Refs.
  const propsAsStringPrevious = useRef<string | undefined>(undefined)
  // States.
  // - Local.
  const hasBeenMountedAtLeastOnce = useRef<boolean>(false)
  // - Global.
  const { isWebWorldReady } = useMapAtoms()
  // Behaviors.
  const { mount, unmount } = useMapSourceMountUnmountCallbacks(props)
  const propsAsString = useMemo(() => stableStringify(props), [props])

  // Mount the source only when props have changed (mounted in the web world),
  // or that the map source has never been mounted.
  useEffect(() => {
    if (!isWebWorldReady) {
      return
    }
    const arePropsEqual = propsAsStringPrevious.current === propsAsString
    const shouldMount = !arePropsEqual || !hasBeenMountedAtLeastOnce.current

    hasBeenMountedAtLeastOnce.current = true
    propsAsStringPrevious.current = propsAsString

    if (shouldMount) {
      unmount()
      mount()
    }
  }, [
    mount,
    unmount,
    hasBeenMountedAtLeastOnce,
    isWebWorldReady,
    propsAsString,
  ])
}

export default useMapSourceMountUnmountWithProps
