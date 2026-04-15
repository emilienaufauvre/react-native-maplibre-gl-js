import { Map, MapProvider, RasterTileSource } from 'react-native-maplibre-gl-js'

/**
 * @returns - Example of the RasterTileSource component usage.
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
      <RasterTileSource
        id={'raster-source'}
        // First, the Raster Tile source is declared.
        source={{
          type: 'raster',
          tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
        }}
        // Then, one or multiple layers that use this source are declared.
        // /!\ it is a list.
        layers={[
          // Add a layer that will overlay the map style.
          {
            layer: {
              id: 'raster-layer',
              type: 'raster',
              // No need to specify the source here, it will be added
              // automatically.
              //> i.e., this is not needed: source: 'raster-source'.
            },
            // Define listeners for this layer.
            listeners: {
              mount: () => console.log('Raster layer mounted'),
            },
          },
        ]}
      />
    </MapProvider>
  )
}

export default Screen
