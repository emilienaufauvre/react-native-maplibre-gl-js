import type { MapSourceProps } from './createMapSourceAsComponent.types'
import useMapSourceMountUnmountWithProps from './hooks/useMapSourceMountUnmountWithProps'

const createMapSourceAsComponent = <Props extends MapSourceProps<any>>() => {
  return (props: Props) => {
    // Mount the map source on launch and update the map source properties when
    // they changed in the component body.
    useMapSourceMountUnmountWithProps<Props>(props)

    return null
  }
}

export default createMapSourceAsComponent
