[react-native-maplibre-gl-js](../../index.md) / [Internal types](../index.md) / MarkerOptions

# MarkerOptions

Defined in: [src/react-native/components/web-objects/Marker/Marker.types.ts:95](https://github.com/emilienaufauvre/react-native-maplibre-gl-js/blob/main/src/react-native/components/web-objects/Marker/Marker.types.ts#L95)

## Properties

| Property | Type | Default value | Description | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-classname"></a> `className?` | `string` | `undefined` | Space-separated CSS class names to add to marker element. | node\_modules/maplibre-gl/dist/maplibre-gl.d.ts:13736 |
| <a id="property-offset"></a> `offset?` | `PointLike` | `undefined` | The offset in pixels as a PointLike object to apply relative to the element's center. Negatives indicate left and up. | node\_modules/maplibre-gl/dist/maplibre-gl.d.ts:13740 |
| <a id="property-anchor"></a> `anchor?` | `PositionAnchor` | `'center'` | A string indicating the part of the Marker that should be positioned closest to the coordinate set via Marker.setLngLat. Options are `'center'`, `'top'`, `'bottom'`, `'left'`, `'right'`, `'top-left'`, `'top-right'`, `'bottom-left'`, and `'bottom-right'`. | node\_modules/maplibre-gl/dist/maplibre-gl.d.ts:13746 |
| <a id="property-color"></a> `color?` | `string` | `'#3FB1CE'` | The color to use for the default marker if options.element is not provided. The default is light blue. | node\_modules/maplibre-gl/dist/maplibre-gl.d.ts:13751 |
| <a id="property-scale"></a> `scale?` | `number` | `1` | The scale to use for the default marker if options.element is not provided. The default scale corresponds to a height of `41px` and a width of `27px`. | node\_modules/maplibre-gl/dist/maplibre-gl.d.ts:13756 |
| <a id="property-draggable"></a> `draggable?` | `boolean` | `false` | A boolean indicating whether or not a marker is able to be dragged to a new position on the map. | node\_modules/maplibre-gl/dist/maplibre-gl.d.ts:13761 |
| <a id="property-clicktolerance"></a> `clickTolerance?` | `number` | `0` | The max number of pixels a user can shift the mouse pointer during a click on the marker for it to be considered a valid click (as opposed to a marker drag). The default is to inherit map's clickTolerance. | node\_modules/maplibre-gl/dist/maplibre-gl.d.ts:13766 |
| <a id="property-rotation"></a> `rotation?` | `number` | `0` | The rotation angle of the marker in degrees, relative to its respective `rotationAlignment` setting. A positive value will rotate the marker clockwise. | node\_modules/maplibre-gl/dist/maplibre-gl.d.ts:13771 |
| <a id="property-rotationalignment"></a> `rotationAlignment?` | `Alignment` | `'auto'` | `map` aligns the `Marker`'s rotation relative to the map, maintaining a bearing as the map rotates. `viewport` aligns the `Marker`'s rotation relative to the viewport, agnostic to map rotations. `auto` is equivalent to `viewport`. | node\_modules/maplibre-gl/dist/maplibre-gl.d.ts:13776 |
| <a id="property-pitchalignment"></a> `pitchAlignment?` | `Alignment` | `'auto'` | `map` aligns the `Marker` to the plane of the map. `viewport` aligns the `Marker` to the plane of the viewport. `auto` automatically matches the value of `rotationAlignment`. | node\_modules/maplibre-gl/dist/maplibre-gl.d.ts:13781 |
| <a id="property-opacity"></a> `opacity?` | `string` \| `number` | `1` | Marker's opacity when it's in clear view (not behind 3d terrain) Accepts any valid CSS opacity value as a number or string. | node\_modules/maplibre-gl/dist/maplibre-gl.d.ts:13787 |
| <a id="property-opacitywhencovered"></a> `opacityWhenCovered?` | `string` \| `number` | `0.2` | Marker's opacity when it's behind 3d terrain Accepts any valid CSS opacity value as a number or string. | node\_modules/maplibre-gl/dist/maplibre-gl.d.ts:13793 |
| <a id="property-subpixelpositioning"></a> `subpixelPositioning?` | `boolean` | `false` | If `true`, rounding is disabled for placement of the marker, allowing for subpixel positioning and smoother movement when the marker is translated. | node\_modules/maplibre-gl/dist/maplibre-gl.d.ts:13799 |
| <a id="property-element"></a> `element?` | `HTMLElementDescriptor` | `undefined` | - |  |
| <a id="property-coordinate"></a> `coordinate?` | `LngLatLike` | `undefined` | - | [src/react-native/components/web-objects/Marker/Marker.types.ts:88](https://github.com/emilienaufauvre/react-native-maplibre-gl-js/blob/main/src/react-native/components/web-objects/Marker/Marker.types.ts#L88) |
