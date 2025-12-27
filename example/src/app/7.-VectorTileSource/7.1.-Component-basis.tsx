import { Map, MapProvider, VectorTileSource } from 'react-native-maplibre-gl-js'

/**
 * @returns - Example of the VectorTileSource component usage.
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
      <VectorTileSource
        id={'vector-source'}
        // First, the Vector Tile source is declared.
        source={{
          type: 'vector',
          tiles: ['https://tiles.openfreemap.org/planet/v3/{z}/{x}/{y}.pbf'],
        }}
        // Then, one or multiple layers that use this source are declared.
        // /!\ it is a list.
        layers={[
          // Add a layer that will highlight the routes.
          {
            layer: {
              id: 'roads',
              type: 'line',
              'source-layer': 'transportation',
              paint: {
                'line-color': 'red',
                'line-width': 1,
              },
              // No need to specify the source here, it will be added
              // automatically.
              //> i.e., this is not needed: source: 'vector-source'.
            },
            // Define listeners for this layer.
            listeners: {
              mount: () => console.log('Vector layer mounted'),
            },
          },
        ]}
      />
    </MapProvider>
  )
}

export default Screen
