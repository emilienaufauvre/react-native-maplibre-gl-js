[react-native-maplibre-gl-js](../../index.md) / [Public API](../index.md) / Popup

# Popup

> `const` **Popup**: [`WebObjectComponent`](../../Internal-types/type-aliases/WebObjectComponent.md)\<[`PopupRef`](../interfaces/PopupRef.md), [`PopupProps`](../interfaces/PopupProps.md)\>

Defined in: [src/react-native/components/Popup/Popup.tsx:35](https://github.com/emilienaufauvre/react-native-maplibre-gl-js/blob/main/src/react-native/components/Popup/Popup.tsx#L35)

MapLibre Popup view.

## Props

[PopupProps](../interfaces/PopupProps.md)

## Ref

[PopupRef](../interfaces/PopupRef.md)

## See

[\`MapLibre GL JS\` docs](https://maplibre.org/maplibre-gl-js/docs/API/classes/Popup/)

## Example

```tsx
<Popup
  ref={popupRef}
  options={{
    closeButton: true,
  }}
  listeners={{
    mount: {
      rnListener: () => {
        // The popup is opened once the coordinates are set.
        popupRef.current?.setLngLat([2.32, 48.86])
        popupRef.current?.setText('This is a popup')
      },
    },
    open: {
      objectListener: () => console.log('Popup opened'),
    },
    close: {
      objectListener: () => console.log('Popup closed'),
    },
  }}
/>
```
