import type { MapSourceProps } from './createMapSourceAsComponent.types'
import { useMemo } from 'react'
import type { MountUpdateUnmountInput } from '../hooks/useMountUnmountUpdateCallbacks.types'
import useMountUpdateUnmountWhenNeeded from '../hooks/useMountUpdateUnmountWhenNeeded'

const createMapSourceAsComponent = <Props extends MapSourceProps<any>>() => {
  return (props: Props) => {
    // Mount the map source on launch and update the map source properties when
    // they changed in the component body.
    // TODO unmount to be added in comment.
    const input: MountUpdateUnmountInput = useMemo(
      () => ({
        type: 'mapSource',
        props: {
          id: props.id,
          source: props.source,
          layers: props.layers,
        },
      }),
      // Decompose props to avoid useless re-rendering of the component.
      [props.id, props.source, props.layers],
    )
    useMountUpdateUnmountWhenNeeded(input)

    return null
  }
}

export default createMapSourceAsComponent
