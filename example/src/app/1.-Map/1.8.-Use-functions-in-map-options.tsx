import { Map, MapProvider } from 'react-native-maplibre-gl-js'

/**
 * @returns - Example of the map component usage, with functions defined in the
 *  web world and given as Map component options.
 */
const Screen = () => {
  return (
    <MapProvider
      // Inject a native script to set custom functions in the web world.
      nativeScripts={
        // /!\ it is a list.
        [
          `
          (() => {
            // This is an IIFE that will be injected into the WebView.

            // Define a custom function to transform camera updates before they
            // are applied to the map. The function is attached to the window.
            window.myCameraTransformation = (next) => {
              // For example, we can smoothly reduce the pitch when zooming out.
              // The result is that at zoom level 10, the pitch is totally
              // disabled.
              const t = Math.min(Math.max((next.zoom - 10) / 4, 0), 1)
              return {
                ...next,
                pitch: next.pitch * t,
              }
            }

            // It must return true to be compliant with the injection mechanism.
            return true
          })()
          `,
        ]
      }
      webLoggerEnabled={true}
      rnLoggerEnabled={true}
    >
      <Map
        options={{
          style: 'https://tiles.openfreemap.org/styles/liberty',
          center: [2.32, 48.86],
          zoom: 12,
          // The function injected using the native script is then referenced in
          // the map options using its name.
          transformCameraUpdate: 'myCameraTransformation',
        }}
      />
    </MapProvider>
  )
}

export default Screen
