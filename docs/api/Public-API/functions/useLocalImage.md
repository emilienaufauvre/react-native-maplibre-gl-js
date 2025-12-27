[react-native-maplibre-gl-js](../../index.md) / [Public API](../index.md) / useLocalImage

# useLocalImage()

> **useLocalImage**(`moduleId`: `number`): `string` \| `null`

Defined in: [src/react-native/hooks/end-user/useLocalImage.ts:15](https://github.com/emilienaufauvre/react-native-maplibre-gl-js/blob/main/src/react-native/hooks/end-user/useLocalImage.ts#L15)

Load a local image as base64 data URI, and return it.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `moduleId` | `number` | The module ID of the image to load (e.g. `require('./image.png')`). |

## Returns

`string` \| `null`

- The base64 data URI of the image.

## Example

```tsx
const image = useLocalImage(require('./image.png'))
```
