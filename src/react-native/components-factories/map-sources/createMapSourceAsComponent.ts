import type { MapSourceProps } from './createMapSourceAsComponent.types'
import useMapSourceMountUnmountUpdateCallbacksTypes from './hooks/useMapSourceMountUnmountUpdateCallbacks.types'

const createMapSourceAsComponent = <Props extends MapSourceProps<any>>() => {
  return (props: Props) => {
    // Mount the map source on launch and update the map source properties when
    // they changed in the component body.
    useMapSourceMountUnmountUpdateCallbacksTypes<Props>(props)

    return null
  }
}

export default createMapSourceAsComponent
