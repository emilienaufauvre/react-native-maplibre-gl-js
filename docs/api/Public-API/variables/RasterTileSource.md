[react-native-maplibre-gl-js](../../index.md) / [Public API](../index.md) / RasterTileSource

# RasterTileSource()

> `const` **RasterTileSource**: (`props`: [`RasterTileSourceProps`](../interfaces/RasterTileSourceProps.md)) => `null`

Defined in: [src/react-native/components/map-sources/RasterTileSource/RasterTileSource.tsx:39](https://github.com/emilienaufauvre/react-native-maplibre-gl-js/blob/main/src/react-native/components/map-sources/RasterTileSource/RasterTileSource.tsx#L39)

MapLibre Raster Tile map source and layers.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `props` | [`RasterTileSourceProps`](../interfaces/RasterTileSourceProps.md) |

## Returns

`null`

## Props

[RasterTileSourceProps](../interfaces/RasterTileSourceProps.md)

## See

[\`MapLibre GL JS\` docs](https://maplibre.org/maplibre-gl-js/docs/API/classes/RasterTileSource/)

## Example

```tsx
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
```
