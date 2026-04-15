import type { MapLibreEvent, MapMouseEvent } from 'maplibre-gl'
import { MapProvider, Map } from 'react-native-maplibre-gl-js'

/**
 * @returns - Example of the map component usage.
 */
const Screen = () => {
  return (
    // The MapProvider must be the parent component of all your map elements.
    // It is necessary to communicate with the `MapLibre GL JS` library.
    <MapProvider>
      {
        // Then you must at least add one Map component to display the map.
        // It can be only one Map component per MapProvider.
      }
      <Map
        // Add your map options here. The options are the ones specified in the
        // `MapLibre GL JS` documentation (MapOptions).
        options={{
          style: 'https://tiles.openfreemap.org/styles/liberty',
          center: [2.32, 48.86],
          zoom: 12,
        }}
        // Attach your listeners here. The listeners are the ones specified in
        // the Maplibre GL JS documentation (+ new ones added by this library
        // because of how it works, like mount/umount events to know when a
        // component is attached to the map).
        listeners={{
          mount: {
            rnListener: () => console.log('Map mounted'),
          },
          unmount: {
            rnListener: () => console.log('Map unmounted'),
          },
          click: {
            objectListener: (event: MapMouseEvent) =>
              console.log('Map clicked', event),
          },
          rotatestart: {
            objectListener: (
              event: MapLibreEvent<MouseEvent | TouchEvent | undefined>,
            ) => console.log('Map rotation started', event),
          },
          // ...
        }}
      />
      {
        // Add your map elements here (Marker, Popup, etc.).
      }
    </MapProvider>
  )
}

export default Screen
