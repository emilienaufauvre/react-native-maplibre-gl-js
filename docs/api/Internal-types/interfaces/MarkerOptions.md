[react-native-maplibre-gl-js](../../index.md) / [Internal types](../index.md) / MarkerOptions

# MarkerOptions

Defined in: [src/react-native/components/web-objects/Marker/Marker.types.ts:51](https://github.com/emilienaufauvre/react-native-maplibre-gl-js/blob/main/src/react-native/components/web-objects/Marker/Marker.types.ts#L51)

## Properties

| Property | Type | Default value | Description | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="classname"></a> `className?` | `string` | `undefined` | Space-separated CSS class names to add to marker element. | node\_modules/maplibre-gl/dist/maplibre-gl.d.ts:13311 |
| <a id="offset"></a> `offset?` | `PointLike` | `undefined` | The offset in pixels as a PointLike object to apply relative to the element's center. Negatives indicate left and up. | node\_modules/maplibre-gl/dist/maplibre-gl.d.ts:13315 |
| <a id="anchor"></a> `anchor?` | `PositionAnchor` | `'center'` | A string indicating the part of the Marker that should be positioned closest to the coordinate set via Marker.setLngLat. Options are `'center'`, `'top'`, `'bottom'`, `'left'`, `'right'`, `'top-left'`, `'top-right'`, `'bottom-left'`, and `'bottom-right'`. | node\_modules/maplibre-gl/dist/maplibre-gl.d.ts:13321 |
| <a id="color"></a> `color?` | `string` | `'#3FB1CE'` | The color to use for the default marker if options.element is not provided. The default is light blue. | node\_modules/maplibre-gl/dist/maplibre-gl.d.ts:13326 |
| <a id="scale"></a> `scale?` | `number` | `1` | The scale to use for the default marker if options.element is not provided. The default scale corresponds to a height of `41px` and a width of `27px`. | node\_modules/maplibre-gl/dist/maplibre-gl.d.ts:13331 |
| <a id="draggable"></a> `draggable?` | `boolean` | `false` | A boolean indicating whether or not a marker is able to be dragged to a new position on the map. | node\_modules/maplibre-gl/dist/maplibre-gl.d.ts:13336 |
| <a id="clicktolerance"></a> `clickTolerance?` | `number` | `0` | The max number of pixels a user can shift the mouse pointer during a click on the marker for it to be considered a valid click (as opposed to a marker drag). The default is to inherit map's clickTolerance. | node\_modules/maplibre-gl/dist/maplibre-gl.d.ts:13341 |
| <a id="rotation"></a> `rotation?` | `number` | `0` | The rotation angle of the marker in degrees, relative to its respective `rotationAlignment` setting. A positive value will rotate the marker clockwise. | node\_modules/maplibre-gl/dist/maplibre-gl.d.ts:13346 |
| <a id="rotationalignment"></a> `rotationAlignment?` | `Alignment` | `'auto'` | `map` aligns the `Marker`'s rotation relative to the map, maintaining a bearing as the map rotates. `viewport` aligns the `Marker`'s rotation relative to the viewport, agnostic to map rotations. `auto` is equivalent to `viewport`. | node\_modules/maplibre-gl/dist/maplibre-gl.d.ts:13351 |
| <a id="pitchalignment"></a> `pitchAlignment?` | `Alignment` | `'auto'` | `map` aligns the `Marker` to the plane of the map. `viewport` aligns the `Marker` to the plane of the viewport. `auto` automatically matches the value of `rotationAlignment`. | node\_modules/maplibre-gl/dist/maplibre-gl.d.ts:13356 |
| <a id="opacity"></a> `opacity?` | `string` | `1` | Marker's opacity when it's in clear view (not behind 3d terrain) | node\_modules/maplibre-gl/dist/maplibre-gl.d.ts:13361 |
| <a id="opacitywhencovered"></a> `opacityWhenCovered?` | `string` | `0.2` | Marker's opacity when it's behind 3d terrain | node\_modules/maplibre-gl/dist/maplibre-gl.d.ts:13366 |
| <a id="subpixelpositioning"></a> `subpixelPositioning?` | `boolean` | `false` | If `true`, rounding is disabled for placement of the marker, allowing for subpixel positioning and smoother movement when the marker is translated. | node\_modules/maplibre-gl/dist/maplibre-gl.d.ts:13372 |
| <a id="coordinate"></a> `coordinate?` | `LngLatLike` | `undefined` | - | [src/react-native/components/web-objects/Marker/Marker.types.ts:52](https://github.com/emilienaufauvre/react-native-maplibre-gl-js/blob/main/src/react-native/components/web-objects/Marker/Marker.types.ts#L52) |
| <a id="element"></a> `element?` | `HTMLElementDescriptor` | `undefined` | - | [src/react-native/components/web-objects/Marker/Marker.types.ts:54](https://github.com/emilienaufauvre/react-native-maplibre-gl-js/blob/main/src/react-native/components/web-objects/Marker/Marker.types.ts#L54) |
