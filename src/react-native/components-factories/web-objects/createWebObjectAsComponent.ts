import { forwardRef, useMemo, useRef } from 'react'
import type {
  WebObjectComponent,
  WebObjectId,
  WebObjectProps,
  WebObjectRef,
  WebObjectType,
} from './createWebObjectAsComponent.types'
import useWebObjectMethodsProxy from '../hooks/useWebObjectMethodsProxy'
import type { MountUpdateUnmountInput } from '../hooks/useMountUnmountUpdateCallbacks.types'
import useMountUpdateUnmountWhenNeeded from '../hooks/useMountUpdateUnmountWhenNeeded'
import { genId } from './createWebObjectAsComponent.utils'

const createWebObjectAsComponent = <
  Ref extends WebObjectRef<any>,
  Props extends WebObjectProps<any, any>,
>(
  objectType: WebObjectType,
): WebObjectComponent<Ref, Props> => {
  return forwardRef<Ref, Props>((props, ref) => {
    // UID of the web object.
    const id = useRef<WebObjectId>(genId())
    // Forward a method call on the RN object ref to the web object.
    useWebObjectMethodsProxy<Ref>(ref, id.current)
    // Mount the web object on launch and update the map source properties when
    // they changed in the component body.
    // TODO unmount to be added in comment.
    const input: MountUpdateUnmountInput = useMemo(
      () => ({
        type: 'webObject',
        props: {
          options: props.options,
          listeners: props.listeners,
        },
        objectId: id.current,
        objectType,
      }),
      // Decompose props to avoid useless re-rendering of the component.
      [id, props.options, props.listeners],
    )
    useMountUpdateUnmountWhenNeeded(input)

    return null
  })
}

export default createWebObjectAsComponent
