import { Map, MapProvider, Marker } from 'react-native-maplibre-gl-js'

/**
 * @returns - Example of the map component usage, with global CSS styles shared
 *  across markers.
 */
const Screen = () => {
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
    <MapProvider cssStyles={css}>
      <Map
        options={{
          style: 'https://tiles.openfreemap.org/styles/liberty',
          center: [2.32, 48.86],
          zoom: 12,
        }}
      />
      <Marker
        options={{
          coordinate: [2.32, 48.86],
          draggable: true,
          element: {
            // Use the CSS styles defined above.
            innerHTML: `
              <div class="pin pin--bounce">
                <h1>📍</h1>
              </div>`,
          },
        }}
      />
      <Marker
        options={{
          coordinate: [2.31, 48.87],
          draggable: true,
          element: {
            // Use the CSS styles defined above.
            innerHTML: `
              <div class="pin pin--bounce">
                <h1>🌍</h1>
              </div>`,
          },
        }}
      />
      <Marker
        options={{
          coordinate: [2.335, 48.855],
          draggable: true,
          element: {
            // Use the CSS styles defined above.
            innerHTML: `
              <div class="pin pin--bounce">
                <h1>✈️</h1>
              </div>`,
          },
        }}
      />
    </MapProvider>
  )
}

export default Screen
