[react-native-maplibre-gl-js](../../index.md) / [Public API](../index.md) / Map

# Map

> `const` **Map**: [`WebObjectComponent`](../../Internal-types/type-aliases/WebObjectComponent.md)\<[`MapRef`](../interfaces/MapRef.md), [`MapProps`](../type-aliases/MapProps.md)\>

Defined in: [src/react-native/components/web-objects/Map/Map.tsx:38](https://github.com/emilienaufauvre/react-native-maplibre-gl-js/blob/main/src/react-native/components/web-objects/Map/Map.tsx#L38)

MapLibre Map view.

## Props

[MapProps](../type-aliases/MapProps.md)

## Ref

[MapRef](../interfaces/MapRef.md)

## See

[\`MapLibre GL JS\` docs](https://maplibre.org/maplibre-gl-js/docs/API/classes/Map/)

## Example

```tsx
<Map
  options={{
    style: 'https://tiles.openfreemap.org/styles/liberty',
    center: [2.32, 48.86],
    zoom: 12,
  }}
  listeners={{
    mount: {
      rnListener: () => console.log('Map mounted'),
    },
    unmount: {
      rnListener: () => console.log('Map unmounted'),
    },
    click: {
      objectListener: (event: MapMouseEvent) =>
        console.log('Map clicked', event),
    },
    rotatestart: {
      objectListener: (
        event: MapLibreEvent<MouseEvent | TouchEvent | undefined>,
      ) => console.log('Map rotation started', event),
    },
  }}
/>
```
