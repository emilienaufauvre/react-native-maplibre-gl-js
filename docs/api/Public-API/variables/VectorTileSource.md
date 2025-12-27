[react-native-maplibre-gl-js](../../index.md) / [Public API](../index.md) / VectorTileSource

# VectorTileSource()

> `const` **VectorTileSource**: (`props`: [`VectorTileSourceProps`](../interfaces/VectorTileSourceProps.md)) => `null`

Defined in: [src/react-native/components/map-sources/VectorTileSource/VectorTileSource.tsx:44](https://github.com/emilienaufauvre/react-native-maplibre-gl-js/blob/main/src/react-native/components/map-sources/VectorTileSource/VectorTileSource.tsx#L44)

MapLibre Vector Tile map source and layers.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `props` | [`VectorTileSourceProps`](../interfaces/VectorTileSourceProps.md) |

## Returns

`null`

## Props

[VectorTileSourceProps](../interfaces/VectorTileSourceProps.md)

## See

[\`MapLibre GL JS\` docs](https://maplibre.org/maplibre-gl-js/docs/API/classes/VectorTileSource/)

## Example

```tsx
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
```
