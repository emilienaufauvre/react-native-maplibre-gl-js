[react-native-maplibre-gl-js](../../index.md) / [Public API](../index.md) / GeoJSONSource

# GeoJSONSource()

> `const` **GeoJSONSource**: (`props`: [`GeoJSONSourceProps`](../interfaces/GeoJSONSourceProps.md)) => `null`

Defined in: [src/react-native/components/map-sources/GeoJSONSource/GeoJSONSource.tsx:78](https://github.com/emilienaufauvre/react-native-maplibre-gl-js/blob/main/src/react-native/components/map-sources/GeoJSONSource/GeoJSONSource.tsx#L78)

MapLibre GeoJSONSource view.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `props` | [`GeoJSONSourceProps`](../interfaces/GeoJSONSourceProps.md) |

## Returns

`null`

## Props

[GeoJSONSourceProps](../interfaces/GeoJSONSourceProps.md)

## See

[\`MapLibre GL JS\` docs](https://maplibre.org/maplibre-gl-js/docs/API/classes/GeoJSONSource/)

## Example

```tsx
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
        //> i.e. this is not needed: source: 'route-source'.
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
```
