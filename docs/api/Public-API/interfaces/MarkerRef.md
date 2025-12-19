[react-native-maplibre-gl-js](../../index.md) / [Public API](../index.md) / MarkerRef

# MarkerRef

Defined in: [src/react-native/components/Marker/Marker.types.ts:22](https://github.com/emilienaufauvre/react-native-maplibre-gl-js/blob/main/src/react-native/components/Marker/Marker.types.ts#L22)

Marker component ref.

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="getid"></a> `getId` | () => `string` |  |
| <a id="off"></a> `off` | (...`args`: \[`string`, `Listener`\]) => `Promise`\<`Marker`\> |  |
| <a id="fire"></a> `fire` | (...`args`: \[`string` \| `Event$1`, `any`\]) => `Promise`\<`Marker`\> |  |
| <a id="on"></a> `on` | (...`args`: \[`string`, `Listener`\]) => `Promise`\<`Subscription`\> |  |
| <a id="once"></a> `once` | (...`args`: \[`string`, `Listener`\]) => `Promise`\<`Promise`\<`any`\> \| `Marker`\> |  |
| <a id="_update"></a> `_update` | (...`args`: \[\{ `type`: `"terrain"` \| `"move"` \| `"moveend"` \| `"render"`; \}\]) => `Promise`\<`void`\> |  |
| <a id="remove"></a> `remove` | (...`args`: \[\]) => `Promise`\<`Marker`\> |  |
| <a id="_eventedparentdata"></a> `_eventedParentData` | (...`args`: `unknown`[]) => `Promise`\<`unknown`\> |  |
| <a id="listens"></a> `listens` | (...`args`: \[`string`\]) => `Promise`\<`boolean`\> |  |
| <a id="seteventedparent"></a> `setEventedParent` | (...`args`: \[`string`\]) => `Promise`\<`Promise`\<`void`\>\> |  |
| <a id="addto"></a> `addTo` | (...`args`: \[\]) => `Promise`\<`Promise`\<`void`\>\> |  |
| <a id="getlnglat"></a> `getLngLat` | (...`args`: \[\]) => `Promise`\<`LngLat`\> |  |
| <a id="setlnglat"></a> `setLngLat` | (...`args`: \[`LngLatLike`\]) => `Promise`\<`Marker`\> |  |
| <a id="getelement"></a> `getElement` | (...`args`: \[\]) => `Promise`\<`HTMLElement`\> |  |
| <a id="setpopup"></a> `setPopup` | (...`args`: \[`string`\]) => `Promise`\<`Promise`\<`void`\>\> |  |
| <a id="setsubpixelpositioning"></a> `setSubpixelPositioning` | (...`args`: \[`boolean`\]) => `Promise`\<`Marker`\> |  |
| <a id="_onkeypress"></a> `_onKeyPress` | (...`args`: \[`KeyboardEvent`\]) => `Promise`\<`void`\> |  |
| <a id="_onmapclick"></a> `_onMapClick` | (...`args`: \[`MapMouseEvent`\]) => `Promise`\<`void`\> |  |
| <a id="getpopup"></a> `getPopup` | (...`args`: \[\]) => `Promise`\<`Popup`\> |  |
| <a id="togglepopup"></a> `togglePopup` | (...`args`: \[\]) => `Promise`\<`Marker`\> |  |
| <a id="_updateopacity"></a> `_updateOpacity` | (...`args`: \[`boolean`\]) => `Promise`\<`void`\> |  |
| <a id="getoffset"></a> `getOffset` | (...`args`: \[\]) => `Promise`\<`Point`\> |  |
| <a id="setoffset"></a> `setOffset` | (...`args`: \[`PointLike`\]) => `Promise`\<`Marker`\> |  |
| <a id="addclassname"></a> `addClassName` | (...`args`: \[`string`\]) => `Promise`\<`void`\> |  |
| <a id="removeclassname"></a> `removeClassName` | (...`args`: \[`string`\]) => `Promise`\<`void`\> |  |
| <a id="toggleclassname"></a> `toggleClassName` | (...`args`: \[`string`\]) => `Promise`\<`boolean`\> |  |
| <a id="_onmove"></a> `_onMove` | (...`args`: \[`MapMouseEvent` \| `MapTouchEvent`\]) => `Promise`\<`void`\> |  |
| <a id="_onup"></a> `_onUp` | (...`args`: \[\]) => `Promise`\<`void`\> |  |
| <a id="_adddraghandler"></a> `_addDragHandler` | (...`args`: \[`MapMouseEvent` \| `MapTouchEvent`\]) => `Promise`\<`void`\> |  |
| <a id="setdraggable"></a> `setDraggable` | (...`args`: \[`boolean`\]) => `Promise`\<`Marker`\> |  |
| <a id="isdraggable"></a> `isDraggable` | (...`args`: \[\]) => `Promise`\<`boolean`\> |  |
| <a id="setrotation"></a> `setRotation` | (...`args`: \[`number`\]) => `Promise`\<`Marker`\> |  |
| <a id="getrotation"></a> `getRotation` | (...`args`: \[\]) => `Promise`\<`number`\> |  |
| <a id="setrotationalignment"></a> `setRotationAlignment` | (...`args`: \[`Alignment`\]) => `Promise`\<`Marker`\> |  |
| <a id="getrotationalignment"></a> `getRotationAlignment` | (...`args`: \[\]) => `Promise`\<`Alignment`\> |  |
| <a id="setpitchalignment"></a> `setPitchAlignment` | (...`args`: \[`Alignment`\]) => `Promise`\<`Marker`\> |  |
| <a id="getpitchalignment"></a> `getPitchAlignment` | (...`args`: \[\]) => `Promise`\<`Alignment`\> |  |
| <a id="setopacity"></a> `setOpacity` | (...`args`: \[`string`, `string`\]) => `Promise`\<`Marker`\> |  |
