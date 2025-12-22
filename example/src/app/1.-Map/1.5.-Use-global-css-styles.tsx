import {
  MapProvider,
  Map,
  Marker,
  type MarkerRef,
} from 'react-native-maplibre-gl-js'
import { useRef } from 'react'

/**
 * @returns - Example of the map component usage, with global CSS styles shared
 *  across markers.
 */
const Screen = () => {
  // Refs.
  const marker1Ref = useRef<MarkerRef | null>(null)
  const marker2Ref = useRef<MarkerRef | null>(null)
  const marker3Ref = useRef<MarkerRef | null>(null)

  // CSS styles to be used among components. Can also be defined as a list of
  // strings (CSS styles).
  const css = `
    :root {
      --pin-bg: #fff;
      --pin-shadow: 0 0 10px #000a;
      --pin-size: 32px;
    }
    .pin {
      display: flex;
      align-items: center;
      justify-content: center;
      width: var(--pin-size);
      height: var(--pin-size);
      margin: 0;
      padding: 4px;
      border-radius: 50%;
      background-color: var(--pin-bg);
      box-shadow: var(--pin-shadow);
    }
    @keyframes pin-bounce {
      0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
      40% { transform: translateY(-15px); }
      60% { transform: translateY(-8px); }
    }
    .pin--bounce {
      animation: pin-bounce 1s infinite;
    }
  `

  return (
    // The CSS styles are passed to the MapProvider component. They will be
    // available to all components rendered inside the MapProvider.
    <MapProvider injectedCss={css}>
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
          draggable: true,
          element: {
            // Use the CSS styles defined above.
            innerHTML: `
              <div class="pin pin--bounce">
                <h1>📍</h1>
              </div>`,
          },
        }}
        listeners={{
          mount: {
            rnListener: () => marker1Ref.current?.setLngLat([2.32, 48.86]),
          },
        }}
      />
      <Marker
        ref={marker2Ref}
        options={{
          draggable: true,
          element: {
            // Use the CSS styles defined above.
            innerHTML: `
              <div class="pin pin--bounce">
                <h1>🌍</h1>
              </div>`,
          },
        }}
        listeners={{
          mount: {
            rnListener: () => marker2Ref.current?.setLngLat([2.31, 48.87]),
          },
        }}
      />
      <Marker
        ref={marker3Ref}
        options={{
          draggable: true,
          element: {
            // Use the CSS styles defined above.
            innerHTML: `
              <div class="pin pin--bounce">
                <h1>✈️</h1>
              </div>`,
          },
        }}
        listeners={{
          mount: {
            rnListener: () => marker3Ref.current?.setLngLat([2.335, 48.855]),
          },
        }}
      />
    </MapProvider>
  )
}

export default Screen
