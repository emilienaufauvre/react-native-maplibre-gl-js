import {
  MapProvider,
  Map,
  Marker,
  type MarkerRef,
} from 'react-native-maplibre-gl-js'
import { useRef } from 'react'

/**
 * @returns - Example of the marker component usage, with an animation
 *  implemented using CSS keyframes.
 */
const Screen = () => {
  // Refs.
  const markerRef = useRef<MarkerRef | null>(null)

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
          element: {
            innerHTML: `
              <style>
                .pin {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  width: 32px;
                  height: 32px;
                  margin: 0;
                  padding: 4px;
                  border-radius: 50%;
                  background-color: #FFF;
                  box-shadow: 0 0 10px #000A;
                }
                /* Animation, triggered once the marker is added to the map. */
                @keyframes pin-pop {
                  from {
                    transform: scale(0.1);
                    opacity: 0.25;
                  }
                  to {
                    transform: scale(1);
                    opacity: 1;
                  }
                }
                .pin--pop {
                  animation: pin-pop 400ms ease-out;
                }
              </style>
              <div class="pin pin--pop">
                <h1>📍</h1>
              </div>`,
          },
        }}
        listeners={{
          mount: {
            rnListener: () => markerRef.current?.setLngLat([2.32, 48.86]),
          },
          click: {
            elementListener: () => {
              // The animation is triggered once the marker is added to the map;
              // therefore, we add it again to the map to trigger the animation.
              markerRef.current?.addTo()
            },
          },
        }}
      />
    </MapProvider>
  )
}

export default Screen
