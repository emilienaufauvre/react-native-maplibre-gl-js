[react-native-maplibre-gl-js](../../index.md) / [Public API](../index.md) / ImageSource

# ImageSource()

> `const` **ImageSource**: (`props`: `ImageSourceProps`) => `null`

Defined in: [src/react-native/components/map-sources/ImageSource/ImageSource.tsx:46](https://github.com/emilienaufauvre/react-native-maplibre-gl-js/blob/main/src/react-native/components/map-sources/ImageSource/ImageSource.tsx#L46)

MapLibre Image map source and layers.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `props` | `ImageSourceProps` |

## Returns

`null`

## Props

ImageSourceProps

## See

[\`MapLibre GL JS\` docs](https://maplibre.org/maplibre-gl-js/docs/API/classes/ImageSource/)

## Example

```tsx
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
      // Define listeners for this layer. This layer does not expose
      // features. Therefore, interactive listeners are never triggered.
      listeners: {
        mount: () => console.log('Image layer mounted'),
      },
    },
  ]}
/>
```
