[react-native-maplibre-gl-js](../../index.md) / [Internal types](../index.md) / MarkerMethods

# MarkerMethods

Defined in: [src/react-native/components/web-objects/Marker/Marker.types.ts:58](https://github.com/emilienaufauvre/react-native-maplibre-gl-js/blob/main/src/react-native/components/web-objects/Marker/Marker.types.ts#L58)

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="property-getid"></a> `getId` | () => `string` |  |
| <a id="property-off"></a> `off` | (...`args`: \[`string`, `Listener`\]) => `Promise`\<`Marker`\> |  |
| <a id="property-fire"></a> `fire` | (...`args`: \[`string` \| `Event$1`, `any`\]) => `Promise`\<`Marker`\> |  |
| <a id="property-on"></a> `on` | (...`args`: \[`string`, `Listener`\]) => `Promise`\<`Subscription`\> |  |
| <a id="property-once"></a> `once` | (...`args`: \[`string`, `Listener`\]) => `Promise`\<`Promise`\<`any`\> \| `Marker`\> |  |
| <a id="property-_update"></a> `_update` | (...`args`: \[\{ `type`: `"terrain"` \| `"move"` \| `"moveend"` \| `"render"`; \}\]) => `Promise`\<`void`\> |  |
| <a id="property-remove"></a> `remove` | (...`args`: \[\]) => `Promise`\<`Marker`\> |  |
| <a id="property-_eventedparentdata"></a> `_eventedParentData` | (...`args`: `unknown`[]) => `Promise`\<`unknown`\> |  |
| <a id="property-listens"></a> `listens` | (...`args`: \[`string`\]) => `Promise`\<`boolean`\> |  |
| <a id="property-seteventedparent"></a> `setEventedParent` | (...`args`: \[`string`\]) => `Promise`\<`Promise`\<`void`\>\> |  |
| <a id="property-addto"></a> `addTo` | (...`args`: \[\]) => `Promise`\<`Promise`\<`void`\>\> |  |
| <a id="property-getlnglat"></a> `getLngLat` | (...`args`: \[\]) => `Promise`\<`LngLat`\> |  |
| <a id="property-setlnglat"></a> `setLngLat` | (...`args`: \[`LngLatLike`\]) => `Promise`\<`Marker`\> |  |
| <a id="property-getelement"></a> `getElement` | (...`args`: \[\]) => `Promise`\<`HTMLElement`\> |  |
| <a id="property-setpopup"></a> `setPopup` | (...`args`: \[`string`\]) => `Promise`\<`Promise`\<`void`\>\> |  |
| <a id="property-setsubpixelpositioning"></a> `setSubpixelPositioning` | (...`args`: \[`boolean`\]) => `Promise`\<`Marker`\> |  |
| <a id="property-_onclick"></a> `_onClick` | (...`args`: \[`MouseEvent`\]) => `Promise`\<`void`\> |  |
| <a id="property-_onkeypress"></a> `_onKeyPress` | (...`args`: \[`KeyboardEvent`\]) => `Promise`\<`void`\> |  |
| <a id="property-_onmapclick"></a> `_onMapClick` | (...`args`: \[`MapMouseEvent`\]) => `Promise`\<`void`\> |  |
| <a id="property-getpopup"></a> `getPopup` | (...`args`: \[\]) => `Promise`\<`Popup`\> |  |
| <a id="property-togglepopup"></a> `togglePopup` | (...`args`: \[\]) => `Promise`\<`Marker`\> |  |
| <a id="property-_updateopacity"></a> `_updateOpacity` | (...`args`: \[`boolean`\]) => `Promise`\<`void`\> |  |
| <a id="property-getoffset"></a> `getOffset` | (...`args`: \[\]) => `Promise`\<`Point`\> |  |
| <a id="property-setoffset"></a> `setOffset` | (...`args`: \[`PointLike`\]) => `Promise`\<`Marker`\> |  |
| <a id="property-addclassname"></a> `addClassName` | (...`args`: \[`string`\]) => `Promise`\<`void`\> |  |
| <a id="property-removeclassname"></a> `removeClassName` | (...`args`: \[`string`\]) => `Promise`\<`void`\> |  |
| <a id="property-toggleclassname"></a> `toggleClassName` | (...`args`: \[`string`\]) => `Promise`\<`boolean`\> |  |
| <a id="property-_onmove"></a> `_onMove` | (...`args`: \[`MapMouseEvent` \| `MapTouchEvent`\]) => `Promise`\<`void`\> |  |
| <a id="property-_onup"></a> `_onUp` | (...`args`: \[\]) => `Promise`\<`void`\> |  |
| <a id="property-_adddraghandler"></a> `_addDragHandler` | (...`args`: \[`MapMouseEvent` \| `MapTouchEvent`\]) => `Promise`\<`void`\> |  |
| <a id="property-setdraggable"></a> `setDraggable` | (...`args`: \[`boolean`\]) => `Promise`\<`Marker`\> |  |
| <a id="property-isdraggable"></a> `isDraggable` | (...`args`: \[\]) => `Promise`\<`boolean`\> |  |
| <a id="property-setrotation"></a> `setRotation` | (...`args`: \[`number`\]) => `Promise`\<`Marker`\> |  |
| <a id="property-getrotation"></a> `getRotation` | (...`args`: \[\]) => `Promise`\<`number`\> |  |
| <a id="property-setrotationalignment"></a> `setRotationAlignment` | (...`args`: \[`Alignment`\]) => `Promise`\<`Marker`\> |  |
| <a id="property-getrotationalignment"></a> `getRotationAlignment` | (...`args`: \[\]) => `Promise`\<`Alignment`\> |  |
| <a id="property-setpitchalignment"></a> `setPitchAlignment` | (...`args`: \[`Alignment`\]) => `Promise`\<`Marker`\> |  |
| <a id="property-getpitchalignment"></a> `getPitchAlignment` | (...`args`: \[\]) => `Promise`\<`Alignment`\> |  |
| <a id="property-setopacity"></a> `setOpacity` | (...`args`: \[`string` \| `number`, `string` \| `number`\]) => `Promise`\<`Marker`\> |  |
