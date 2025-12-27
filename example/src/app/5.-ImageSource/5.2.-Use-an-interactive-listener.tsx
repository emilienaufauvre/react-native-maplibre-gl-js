import {
  MapProvider,
  Map,
  ImageSource,
  GeoJSONSource,
} from 'react-native-maplibre-gl-js'

/**
 * @returns - Example of the ImageSource component usage, using a click
 *  listener.
 */
const Screen = () => {
  const coordinates: [
    [number, number],
    [number, number],
    [number, number],
    [number, number],
  ] = [
    [2.325984383759419, 48.87044351904299],
    [2.3517090282194317, 48.87044297931527],
    [2.351833890385791, 48.85134902326752],
    [2.3257573781646386, 48.85135618849253],
  ]

  return (
    <MapProvider>
      <Map
        options={{
          style: 'https://tiles.openfreemap.org/styles/liberty',
          center: [2.335, 48.865],
          zoom: 12,
        }}
      />
      {/* The ImageSource is used to display the image. However, it does not
      support interactive listeners since it renders no features. */}
      <ImageSource
        id={'image-source'}
        source={{
          type: 'image',
          url: 'https://placehold.co/600x600.png',
          coordinates,
        }}
        layers={[
          {
            layer: {
              id: 'image-layer',
              type: 'raster',
            },
          },
        ]}
      />
      {/* The GeoJSONSource is used to draw a hitbox on top of the image. Then
      the click listener is attached to this hitbox. */}
      <GeoJSONSource
        id={'image-hitbox-source'}
        source={{
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates,
            },
          },
        }}
        layers={[
          {
            layer: {
              id: 'image-hitbox-layer',
              type: 'fill',
              paint: {
                'fill-opacity': 0,
              },
            },
            listeners: {
              click: () => console.log('Image clicked'),
            },
          },
        ]}
      />
    </MapProvider>
  )
}

export default Screen
