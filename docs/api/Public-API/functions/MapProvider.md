[react-native-maplibre-gl-js](../../index.md) / [Public API](../index.md) / MapProvider

# MapProvider()

> **MapProvider**(`props`: [`MapProviderProps`](../type-aliases/MapProviderProps.md)): `Element`

Defined in: [src/react-native/components/core/MapProvider/MapProvider.tsx:35](https://github.com/emilienaufauvre/react-native-maplibre-gl-js/blob/main/src/react-native/components/core/MapProvider/MapProvider.tsx#L35)

Must be used as a parent component to allow instantiation of map elements.
Every child must be a direct component.
This is the bridge to the web world / the `MapLibre GL JS` library.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `props` | [`MapProviderProps`](../type-aliases/MapProviderProps.md) |  |

## Returns

`Element`

## Example

```tsx
<MapProvider>
  <Map/>
  <Marker/>
  ...
</MapProvider>
```
