import { MapProvider, Map, type MapRef } from 'react-native-maplibre-gl-js'
import { useRef } from 'react'

/**
 * @returns - Example of the map component usage, with a RasterTileSource, but
 *  not instantiated as a component.
 */
const Screen = () => {
  // Refs.
  const mapRef = useRef<MapRef>(null)

  return (
    <MapProvider>
      <Map
        ref={mapRef}
        options={{
          center: [2.32, 48.86],
          zoom: 12,
          // No need to pass a style option.
        }}
        listeners={{
          mount: {
            rnListener: () => {
              // Add the OSM tiles server as a raster source.
              mapRef.current?.addSource('raster-source-id', {
                type: 'raster',
                tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
                tileSize: 256,
              })
              // Insert it to the map as a raster layer.
              mapRef.current?.addLayer({
                id: 'raster-source-layer',
                type: 'raster',
                source: 'raster-source-id',
              })
            },
          },
        }}
      />
    </MapProvider>
  )
}

export default Screen
