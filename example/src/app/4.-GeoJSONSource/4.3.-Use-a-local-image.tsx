import {
  GeoJSONSource,
  Map,
  MapProvider,
  type MapRef,
  useLocalImage,
} from 'react-native-maplibre-gl-js'
import { useRef } from 'react'

/**
 * @returns - Example of the GeoJSONSource component usage that displays images
 *  at precise coordinate.
 */
const Screen = () => {
  // Refs.
  const mapRef = useRef<MapRef | null>(null)
  // Load the local image in base64 using the "useLocalImage" hook.
  const image = useLocalImage(require('../../../assets/star.png'))

  return (
    <MapProvider>
      <Map
        ref={mapRef}
        options={{
          style: 'https://tiles.openfreemap.org/styles/liberty',
          center: [2.335, 48.865],
          zoom: 12,
        }}
        listeners={{
          // Register the image on the map so it can be used by the layers.
          mount: {
            rnListener: async () => {
              await mapRef.current?.addImage('my-image', image!)
            },
          },
        }}
      />
      <GeoJSONSource
        id={'points-source'}
        // Add a source containing multiple points.
        source={{
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                properties: {},
                geometry: {
                  type: 'Point',
                  coordinates: [2.3197524692323555, 48.8749271052105],
                },
              },
              {
                type: 'Feature',
                properties: {},
                geometry: {
                  type: 'Point',
                  coordinates: [2.3539284556225653, 48.87860855464629],
                },
              },
              {
                type: 'Feature',
                properties: {},
                geometry: {
                  type: 'Point',
                  coordinates: [2.339892976822256, 48.85894730566926],
                },
              },
            ],
          },
        }}
        // The layers will display the loaded image at each point coordinate.
        layers={[
          // - First a layer for the image shadow.
          {
            layer: {
              id: 'image-shadow-layer',
              type: 'circle',
              paint: {
                'circle-color': 'black',
                'circle-radius': 30,
                'circle-blur': 1.5,
              },
            },
          },
          // - Then a layer for the image itself.
          {
            layer: {
              id: 'image-layer',
              type: 'symbol',
              layout: {
                'icon-image': 'my-image',
                'icon-size': 0.05,
              },
            },
          },
        ]}
      />
    </MapProvider>
  )
}

export default Screen
