import type { WebObjectProps } from '../createWebObjectAsComponent.types'
import { type PropsWithoutRef, useEffect, useMemo, useRef } from 'react'
import { stableStringify } from '../../hooks/atoms/useMapAtoms.utils'
import useMapAtoms from '../../hooks/atoms/useMapAtoms'
import useWebObjectMountUnmountCallbacks from './useWebObjectMountUnmountCallbacks'
import type { WebObjectType } from '../../../communication/messages.types'

/**
 * Mount the component as a web object within the web world on component mount.
 * Propagate any change in the component props to the web world by unmounting
 * and mounting the web object with the new options.
 * @param props - The RN object props.
 * @param objectId - The ID of the web object that owns the method.
 * @param objectType - The type of the associated web object.
 */
export const useWebObjectMountUnmountWithProps = <
  Props extends WebObjectProps<any, any>,
>(
  props: PropsWithoutRef<Props>,
  objectId: string,
  objectType: WebObjectType,
) => {
  // Refs.
  const optionsAsStringPrevious = useRef<string | undefined>(undefined)
  // States.
  // - Local.
  const hasBeenMountedAtLeastOnce = useRef<boolean>(false)
  // - Global.
  const { isWebWorldReady } = useMapAtoms()
  // Behaviors.
  const { mount, unmount } = useWebObjectMountUnmountCallbacks(
    props,
    objectId,
    objectType,
  )
  const optionsAsString = useMemo(() => stableStringify(props.options), [props])

  // Mount options only when they have changed (mounted in the web world), or
  // that the web object has never been mounted.
  // Listeners are always mounted: they are inexpensive (mounted in the RN
  // world) and cannot be reliably compared when declared inline in the
  // component, as they change on every render.
  useEffect(() => {
    if (!isWebWorldReady) {
      return
    }
    console.log(
      'optionsAsStringPrevious',
      optionsAsStringPrevious.current,
      optionsAsString,
      hasBeenMountedAtLeastOnce.current,
    )
    const areOptionsEqual = optionsAsStringPrevious.current === optionsAsString
    const shouldMountOptions =
      !areOptionsEqual || !hasBeenMountedAtLeastOnce.current

    hasBeenMountedAtLeastOnce.current = true
    optionsAsStringPrevious.current = optionsAsString

    unmount({
      options: shouldMountOptions,
      listeners: true,
    })
    mount({
      options: shouldMountOptions,
      listeners: true,
    })
  }, [
    mount,
    unmount,
    optionsAsStringPrevious,
    optionsAsString,
    props.listeners,
    hasBeenMountedAtLeastOnce,
    isWebWorldReady,
  ])
}

export default useWebObjectMountUnmountWithProps
