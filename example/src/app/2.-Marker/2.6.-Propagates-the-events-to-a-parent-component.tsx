import {
  Map,
  MapProvider,
  Marker,
  type MarkerRef,
} from 'react-native-maplibre-gl-js'
import { useRef } from 'react'

/**
 * @returns - Example of the marker component usage, with its drag event
 * propagated to another (not draggable) marker.
 */
const Screen = () => {
  // Refs.
  const marker1Ref = useRef<MarkerRef | null>(null)
  const marker2Ref = useRef<MarkerRef | null>(null)

  return (
    <MapProvider>
      <Map
        options={{
          style: 'https://tiles.openfreemap.org/styles/liberty',
          center: [2.32, 48.86],
          zoom: 12,
        }}
      />
      <Marker
        ref={marker1Ref}
        options={{
          coordinate: [2.33, 48.87],
          draggable: false,
          element: {
            innerHTML: '<b>Undraggable Marker</b>',
          },
        }}
        listeners={{
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
          coordinate: [2.32, 48.86],
          draggable: true,
          element: {
            innerHTML: '<b>Draggable Marker</b>',
          },
        }}
        listeners={{
          mount: {
            rnListener: () => {
              if (!marker1Ref.current) {
                return
              }
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
