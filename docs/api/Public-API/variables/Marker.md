[react-native-maplibre-gl-js](../../index.md) / [Public API](../index.md) / Marker

# Marker

> `const` **Marker**: [`WebObjectComponent`](../../Internal-types/type-aliases/WebObjectComponent.md)\<[`MarkerRef`](../interfaces/MarkerRef.md), [`MarkerProps`](../interfaces/MarkerProps.md)\>

Defined in: [src/react-native/components/Marker/Marker.tsx:59](https://github.com/emilienaufauvre/react-native-maplibre-gl-js/blob/main/src/react-native/components/Marker/Marker.tsx#L59)

MapLibre Marker view.

## Props

[MarkerProps](../interfaces/MarkerProps.md)

## Ref

[MarkerRef](../interfaces/MarkerRef.md)

## See

[\`MapLibre GL JS\` docs](https://maplibre.org/maplibre-gl-js/docs/API/classes/Marker/)

## Example

```tsx
<Marker
  ref={markerRef}
  options={{
    draggable: true,
    // The element to be used as the marker (mocks the HTMLElement class).
    element: {
      tagName: 'div',
      innerHTML: `
          <style>
            .no-margin * {
              margin: 0;
            }
          </style>
          <div
            class="no-margin"
            style="
              display: flex;
              align-items: center;
              justify-content: center;
              aspect-ratio: 1;
              padding: 4px;
              border-radius: 50%;
              background-color: #FFF;
              box-shadow: 0 0 10px #000A;
            "
          >
            <h1>📍</h1>
          </div>`,
    },
  }}
  listeners={{
    mount: {
      rnListener: () => {
        // The marker coordinate must be set on mount.
        markerRef.current?.setLngLat([2.32, 48.86])
      },
    },
    click: {
      elementListener: async (_: MouseEvent) => {
        const lngLat = await markerRef.current?.getLngLat()
        console.log('Marker clicked at', lngLat)
      },
    },
  }}
/>
```
