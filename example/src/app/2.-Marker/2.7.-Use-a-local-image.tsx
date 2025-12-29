import {
  Map,
  MapProvider,
  Marker,
  type MarkerRef,
  useLocalImage,
} from 'react-native-maplibre-gl-js'
import { useRef } from 'react'

/**
 * @returns - Example of the marker component usage, with an image
 *  stored locally in the app bundle, instead of a remote URL.
 */
const Screen = () => {
  // Refs.
  const markerRef = useRef<MarkerRef | null>(null)
  // Load the local image in base64 using the "useLocalImage" hook.
  const image = useLocalImage(require('../../../assets/marker.png'))

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
          coordinate: [2.32, 48.86],
          draggable: true,
          element: {
            // The image is then used with the <img/> tag.
            innerHTML: `
              <style>
                .pin {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  margin: 0;
                  border-radius: 50%;
                  background-color: #FFF;
                  box-shadow: 0 0 10px #000A;
                }
                .pin img {
                  width: 64px;
                  height: 64px;
                  object-fit: contain;
                }
              </style>
              <div class="pin">
                <img alt="pin" src="${image}" />
              </div>
            `,
          },
        }}
      />
    </MapProvider>
  )
}

export default Screen
