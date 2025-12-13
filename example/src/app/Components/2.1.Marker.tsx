import RNMapLibreGlJs from 'react-native-maplibre-gl-js'
import { useRef } from 'react'
import type { MarkerMethods } from 'react-native-maplibre-gl-js/react-native/components/Marker/Marker.types'
import { COORDINATE_DEFAULT_1, MAP_STYLE_URL_DEFAULT } from '../../constants'

/**
 * @returns - Example of the marker component usage.
 */
const Screen = () => {
  // Refs.
  const markerRef = useRef<MarkerMethods>(null)

  return (
    <RNMapLibreGlJs.MapProvider>
      <RNMapLibreGlJs.Map
        options={{
          style: MAP_STYLE_URL_DEFAULT,
          center: COORDINATE_DEFAULT_1,
          zoom: 12,
        }}
      />
      <RNMapLibreGlJs.Marker
        ref={markerRef}
        options={{
          draggable: true,
          // The element to be used as the marker (mocks the HTMLElement class).
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
              markerRef.current?.setLngLat(COORDINATE_DEFAULT_1)
            },
          },
          unmount: {
            rnListener: () => console.log('Marker unmounted'),
          },
          dragend: {
            objectListener: (_) => console.log('Marker drag ended'),
          },
          click: {
            elementListener: async (_) => {
              const lngLat = await markerRef.current?.getLngLat()
              console.log('Marker clicked at', lngLat)
            },
          },
        }}
      />
    </RNMapLibreGlJs.MapProvider>
  )
}

export default Screen
