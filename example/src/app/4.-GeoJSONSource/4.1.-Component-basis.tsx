import { GeoJSONSource, MapProvider, Map } from 'react-native-maplibre-gl-js'
import type { MapLayerMouseEvent } from 'maplibre-gl'

/**
 * @returns - Example of the GeoJSONSource component usage.
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
      <GeoJSONSource
        id={'route-source'}
        // First, the GeoJSON source is declared.
        source={{
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: [
                [2.3197524692323555, 48.8749271052105],
                [2.3318628256634497, 48.87629193201764],
                [2.333270077451971, 48.87298771346718],
                [2.3539284556225653, 48.87860855464629],
                [2.36304571554723, 48.86863423755426],
                [2.3623093843056893, 48.86792991283812],
                [2.3632503621944636, 48.8674023621318],
                [2.3623775899050656, 48.86696171185605],
                [2.3460482571265118, 48.86321986494235],
                [2.345044674583818, 48.86489255606446],
                [2.342836574244785, 48.86366004938668],
                [2.342167359184458, 48.86396816871331],
                [2.339892976822256, 48.85894730566926],
                [2.3424351182532916, 48.85842150492988],
                [2.33848724513237, 48.85371097455581],
                [2.338621048081677, 48.85243321114592],
                [2.3273130690084542, 48.85529597105079],
                [2.325572195273992, 48.85617581196192],
                [2.319266462248919, 48.86255873598756],
                [2.3180603268802997, 48.86304335107252],
                [2.31377036832896, 48.86295514884904],
                [2.3138874292627065, 48.86781147917537],
                [2.316355329389012, 48.87115714435822],
                [2.3159804506686044, 48.87133324352027],
                [2.31582208168669, 48.87538156445444],
                [2.3197524692323555, 48.8749271052105],
              ],
            },
          },
        }}
        // Then, one or multiple layers that use this source are declared.
        // /!\ it is a list.
        layers={[
          // Add a layer that will be the path black outline.
          {
            layer: {
              id: 'route-layer-1',
              type: 'line',
              // No need to specify the source here, it will be added
              // automatically.
              //> i.e., this is not needed: source: 'route-source'.
              layout: {
                'line-join': 'round',
                'line-cap': 'round',
              },
              paint: {
                'line-color': 'black',
                'line-width': 6,
              },
            },
            // Define listeners for this layer.
            listeners: {
              mount: () => console.log('Route layer 1 mounted'),
              click: (event: MapLayerMouseEvent) =>
                console.log('Route layer 1 clicked at ', event.lngLat),
            },
          },
          // Add another layer that will be the path red line.
          {
            layer: {
              id: 'route-layer-2',
              type: 'line',
              layout: {
                'line-join': 'round',
                'line-cap': 'round',
              },
              paint: {
                'line-color': '#FF5555',
                'line-width': 3,
              },
            },
            listeners: {
              mount: () => console.log('Route layer 2 mounted'),
            },
          },
        ]}
      />
    </MapProvider>
  )
}

export default Screen
