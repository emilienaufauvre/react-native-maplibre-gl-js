import { Map, MapProvider } from 'react-native-maplibre-gl-js'

/**
 * @returns - Example of the map component usage, with settings to
 *  "improve" the drag-to-pan behavior.
 */
const Screen = () => {
  return (
    <MapProvider>
      <Map
        options={{
          style: 'https://tiles.openfreemap.org/styles/liberty',
          center: [2.32, 48.86],
          zoom: 12,
          dragPan: {
            linearity: 2,
            // Add more velocity to drag-to-pan (default is slow for mobile).
            maxSpeed: 3500,
            // Also make it stops slower (to give it more inertia)
            deceleration: 1000,
          },
        }}
      />
    </MapProvider>
  )
}

export default Screen
