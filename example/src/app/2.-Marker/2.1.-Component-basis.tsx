import {
  MapProvider,
  Map,
  Marker,
  type MarkerRef,
} from 'react-native-maplibre-gl-js'
import { Event } from 'maplibre-gl'
import { useRef } from 'react'

/**
 * @returns - Example of the marker component usage.
 */
const Screen = () => {
  // Refs.
  const markerRef = useRef<MarkerRef>(null)

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
        ref={markerRef}
        options={{
          draggable: true,
          // The element to be used as the marker (a descriptor of an
          // HTMLElement).
          element: {
            tagName: 'div',
            innerHTML: `
                <style>
                  .no-margin * {
                    margin: 0;
                  }
                </style>
                <div
                  class="no-margin"
                  style="
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    aspect-ratio: 1;
                    padding: 4px;
                    border-radius: 50%;
                    background-color: #FFF;
                    box-shadow: 0 0 10px #000A;
                  "
                >
                  <h1>📍</h1>
                </div>`,
          },
        }}
        listeners={{
          mount: {
            rnListener: () => {
              // The marker coordinate must be set on mount.
              markerRef.current?.setLngLat([2.32, 48.86])
            },
          },
          unmount: {
            rnListener: () => console.log('Marker unmounted'),
          },
          dragend: {
            objectListener: (_: Event) => console.log('Marker drag ended'),
          },
          click: {
            elementListener: async (_: MouseEvent) => {
              const lngLat = await markerRef.current?.getLngLat()
              console.log('Marker clicked at', lngLat)
            },
          },
        }}
      />
    </MapProvider>
  )
}

export default Screen
