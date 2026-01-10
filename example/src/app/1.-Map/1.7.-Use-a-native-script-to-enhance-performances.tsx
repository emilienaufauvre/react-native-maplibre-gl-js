import { GeoJSONSource, Map, MapProvider } from 'react-native-maplibre-gl-js'
import { useState } from 'react'

/**
 * @returns - Example of the map component usage, with a high-frequency task
 *  configured on the native side to enhance performance.
 */
const Screen = () => {
  const [isMapMounted, setIsMapMounted] = useState(false)

  return (
    <MapProvider
      // Inject a native script to update the GeoJSON source on each map move.
      // It is a high-frequency task, therefore, it is injected as a native
      // script to enhance the app performance.
      // Inject the script only once the map is mounted.
      nativeScripts={
        // /!\ it is a list.
        [
          !isMapMounted
            ? ''
            : `
          (() => {
            // This is an IIFE that will be injected into the WebView.

            // You could access the map controller, and the map object directly.
            const map = window.__RNML_CONTROLLER.map
            // Add a 'move' event listener to the map.
            map.on('move', () => {
              // Select the top 20 features visible on the map
              const features = map.queryRenderedFeatures()
              features.splice(20)
              // Update the GeoJSON source with these new features.
              map.getSource('my-layer').setData({
                type: "FeatureCollection",
                features: features.map(f => ({
                  type: "Feature",
                  geometry: f.geometry,
                  properties: f.properties || {},
                  id: f.id,
                })),
              })
            })

            // Send a message to React Native to indicate that the script has
            // been executed.
            window.__RNML_BRIDGE.postMessage({
              type: 'console',
              payload: {
                level: 'debug',
                args: ['Hey this is a log message', 'Everything is set up!'],
              },
            })

            // It must return true to be compliant with the injection mechanism.
            return true
          })()
          `,
        ]
      }
      rnLoggerEnabled={true}
    >
      <Map
        options={{
          style: 'https://tiles.openfreemap.org/styles/liberty',
          center: [2.32, 48.86],
          zoom: 12,
        }}
        listeners={{
          mount: {
            rnListener: () => setIsMapMounted(true),
          },
        }}
      />
      <GeoJSONSource
        id={'my-layer'}
        source={{
          type: 'geojson',
          data: '',
        }}
        layers={[
          {
            layer: {
              id: 'my-layer',
              type: 'circle',
              paint: {
                'circle-color': '#007cbf',
                'circle-stroke-width': 2,
                'circle-stroke-color': '#ffffff',
                'circle-radius': 6,
              },
            },
          },
        ]}
      />
    </MapProvider>
  )
}

export default Screen
