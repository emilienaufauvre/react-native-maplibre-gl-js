import {
  MapProvider,
  Map,
  Marker,
  type MarkerRef,
} from 'react-native-maplibre-gl-js'
import { useRef } from 'react'
import {
  COORDINATE_DEFAULT_1,
  COORDINATE_DEFAULT_2,
  MAP_STYLE_URL_DEFAULT,
} from '../../constants'

/**
 * @returns - Example of the marker component usage, with its drag event
 * propagated to another (not draggable) marker.
 */
const Screen = () => {
  // Refs.
  const marker1Ref = useRef<MarkerRef>(null)
  const marker2Ref = useRef<MarkerRef>(null)

  return (
    <MapProvider>
      <Map
        options={{
          style: MAP_STYLE_URL_DEFAULT,
          center: COORDINATE_DEFAULT_1,
          zoom: 12,
        }}
      />
      <Marker
        ref={marker1Ref}
        options={{
          draggable: false,
          element: {
            innerHTML: '<b>undraggable marker</b>',
          },
        }}
        listeners={{
          mount: {
            rnListener: () => {
              marker1Ref.current?.setLngLat(COORDINATE_DEFAULT_2)
            },
          },
          dragend: {
            objectListener: () => {
              console.log('Marker 1 drag ended')
            },
          },
        }}
      />
      <Marker
        ref={marker2Ref}
        options={{
          draggable: true,
          element: {
            innerHTML: '<b>draggable marker</b>',
          },
        }}
        listeners={{
          mount: {
            rnListener: () => {
              if (!marker1Ref.current) {
                return
              }
              marker2Ref.current?.setLngLat(COORDINATE_DEFAULT_1)
              marker2Ref.current?.setEventedParent(marker1Ref.current.getId())
              // Now, when you click on the marker, the click event will be
              // propagated to the first marker.
            },
          },
          dragend: {
            objectListener: () => {
              console.log('Marker 2 drag ended')
            },
          },
        }}
      />
    </MapProvider>
  )
}

export default Screen
