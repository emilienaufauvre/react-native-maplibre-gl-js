import { MapProvider, Map, ImageSource } from 'react-native-maplibre-gl-js'

/**
 * @returns - Example of the ImageSource component usage.
 */
const Screen = () => {
  return (
    <MapProvider>
      <Map
        options={{
          style: 'https://tiles.openfreemap.org/styles/liberty',
          center: [2.335, 48.865],
          zoom: 12,
        }}
      />
      <ImageSource
        id={'image-source'}
        // First, the Image source is declared.
        source={{
          type: 'image',
          url: 'https://placehold.co/600x600.png',
          coordinates: [
            [2.325984383759419, 48.87044351904299],
            [2.3517090282194317, 48.87044297931527],
            [2.351833890385791, 48.85134902326752],
            [2.3257573781646386, 48.85135618849253],
          ],
        }}
        // Then, one or multiple layers that use this source are declared.
        // /!\ it is a list.
        layers={[
          // Add a layer that will be the image itself.
          {
            layer: {
              id: 'image-layer',
              type: 'raster',
              // No need to specify the source here, it will be added
              // automatically.
              //> i.e., this is not needed: source: 'image-source'.
            },
            // Define listeners for this layer.
            listeners: {
              mount: () => console.log('Image layer mounted'),
            },
          },
        ]}
      />
    </MapProvider>
  )
}

export default Screen
