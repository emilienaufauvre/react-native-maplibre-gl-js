[react-native-maplibre-gl-js](../../index.md) / [Internal types](../index.md) / PopupOptions

# PopupOptions

Defined in: [src/react-native/components/web-objects/Popup/Popup.types.ts:46](https://github.com/emilienaufauvre/react-native-maplibre-gl-js/blob/main/src/react-native/components/web-objects/Popup/Popup.types.ts#L46)

## Properties

| Property | Type | Default value | Description | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="closebutton"></a> `closeButton?` | `boolean` | `true` | If `true`, a close button will appear in the top right corner of the popup. | node\_modules/maplibre-gl/dist/maplibre-gl.d.ts:12961 |
| <a id="closeonclick"></a> `closeOnClick?` | `boolean` | `true` | If `true`, the popup will closed when the map is clicked. | node\_modules/maplibre-gl/dist/maplibre-gl.d.ts:12966 |
| <a id="closeonmove"></a> `closeOnMove?` | `boolean` | `false` | If `true`, the popup will closed when the map moves. | node\_modules/maplibre-gl/dist/maplibre-gl.d.ts:12971 |
| <a id="focusafteropen"></a> `focusAfterOpen?` | `boolean` | `true` | If `true`, the popup will try to focus the first focusable element inside the popup. | node\_modules/maplibre-gl/dist/maplibre-gl.d.ts:12976 |
| <a id="anchor"></a> `anchor?` | `PositionAnchor` | `undefined` | A string indicating the part of the Popup that should be positioned closest to the coordinate set via Popup.setLngLat. Options are `'center'`, `'top'`, `'bottom'`, `'left'`, `'right'`, `'top-left'`, `'top-right'`, `'bottom-left'`, and `'bottom-right'`. If unset the anchor will be dynamically set to ensure the popup falls within the map container with a preference for `'bottom'`. | node\_modules/maplibre-gl/dist/maplibre-gl.d.ts:12985 |
| <a id="offset"></a> `offset?` | `Offset` | `undefined` | A pixel offset applied to the popup's location | node\_modules/maplibre-gl/dist/maplibre-gl.d.ts:12989 |
| <a id="classname"></a> `className?` | `string` | `undefined` | Space-separated CSS class names to add to popup container | node\_modules/maplibre-gl/dist/maplibre-gl.d.ts:12993 |
| <a id="maxwidth"></a> `maxWidth?` | `string` | `'240px'` | A string that sets the CSS property of the popup's maximum width, eg `'300px'`. To ensure the popup resizes to fit its content, set this property to `'none'`. Available values can be found here: https://developer.mozilla.org/en-US/docs/Web/CSS/max-width | node\_modules/maplibre-gl/dist/maplibre-gl.d.ts:13000 |
| <a id="subpixelpositioning"></a> `subpixelPositioning?` | `boolean` | `false` | If `true`, rounding is disabled for placement of the popup, allowing for subpixel positioning and smoother movement when the popup is translated. | node\_modules/maplibre-gl/dist/maplibre-gl.d.ts:13006 |
| <a id="locationoccludedopacity"></a> `locationOccludedOpacity?` | `string` \| `number` | `undefined` | Optional opacity when the location is behind the globe. Note that if a number is provided, it will be converted to a string. | node\_modules/maplibre-gl/dist/maplibre-gl.d.ts:13012 |
