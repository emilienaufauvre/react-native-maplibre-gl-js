[react-native-maplibre-gl-js](../../index.md) / [Public API](../index.md) / PopupRef

# PopupRef

Defined in: [src/react-native/components/Popup/Popup.types.ts:20](https://github.com/emilienaufauvre/react-native-maplibre-gl-js/blob/main/src/react-native/components/Popup/Popup.types.ts#L20)

Popup component ref.

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="getid"></a> `getId` | () => `string` |  |
| <a id="off"></a> `off` | (...`args`: \[`string`, `Listener`\]) => `Promise`\<`Popup`\> |  |
| <a id="fire"></a> `fire` | (...`args`: \[`string` \| `Event$1`, `any`\]) => `Promise`\<`Popup`\> |  |
| <a id="on"></a> `on` | (...`args`: \[`string`, `Listener`\]) => `Promise`\<`Subscription`\> |  |
| <a id="once"></a> `once` | (...`args`: \[`string`, `Listener`\]) => `Promise`\<`Promise`\<`any`\> \| `Popup`\> |  |
| <a id="_update"></a> `_update` | (...`args`: \[`Point`\]) => `Promise`\<`void`\> |  |
| <a id="remove"></a> `remove` | (...`args`: \[\]) => `Promise`\<`Popup`\> |  |
| <a id="_eventedparentdata"></a> `_eventedParentData` | (...`args`: `unknown`[]) => `Promise`\<`unknown`\> |  |
| <a id="listens"></a> `listens` | (...`args`: \[`string`\]) => `Promise`\<`boolean`\> |  |
| <a id="seteventedparent"></a> `setEventedParent` | (...`args`: \[`string`\]) => `Promise`\<`Promise`\<`void`\>\> |  |
| <a id="addto"></a> `addTo` | (...`args`: \[\]) => `Promise`\<`Promise`\<`void`\>\> |  |
| <a id="getlnglat"></a> `getLngLat` | (...`args`: \[\]) => `Promise`\<`LngLat`\> |  |
| <a id="setlnglat"></a> `setLngLat` | (...`args`: \[`LngLatLike`\]) => `Promise`\<`Popup`\> |  |
| <a id="getelement"></a> `getElement` | (...`args`: \[\]) => `Promise`\<`HTMLElement`\> |  |
| <a id="setsubpixelpositioning"></a> `setSubpixelPositioning` | (...`args`: \[`boolean`\]) => `Promise`\<`void`\> |  |
| <a id="_updateopacity"></a> `_updateOpacity` | (...`args`: \[\]) => `Promise`\<`void`\> |  |
| <a id="setoffset"></a> `setOffset` | (...`args`: \[`Offset`\]) => `Promise`\<`Popup`\> |  |
| <a id="addclassname"></a> `addClassName` | (...`args`: \[`string`\]) => `Promise`\<`Popup`\> |  |
| <a id="removeclassname"></a> `removeClassName` | (...`args`: \[`string`\]) => `Promise`\<`Popup`\> |  |
| <a id="toggleclassname"></a> `toggleClassName` | (...`args`: \[`string`\]) => `Promise`\<`boolean` \| `undefined`\> |  |
| <a id="isopen"></a> `isOpen` | (...`args`: \[\]) => `Promise`\<`boolean`\> |  |
| <a id="trackpointer"></a> `trackPointer` | (...`args`: \[\]) => `Promise`\<`Popup`\> |  |
| <a id="settext"></a> `setText` | (...`args`: \[`string`\]) => `Promise`\<`Popup`\> |  |
| <a id="sethtml"></a> `setHTML` | (...`args`: \[`string`\]) => `Promise`\<`Popup`\> |  |
| <a id="getmaxwidth"></a> `getMaxWidth` | (...`args`: \[\]) => `Promise`\<`string`\> |  |
| <a id="setmaxwidth"></a> `setMaxWidth` | (...`args`: \[`string`\]) => `Promise`\<`Popup`\> |  |
| <a id="setdomcontent"></a> `setDOMContent` | (...`args`: \[`Node`\]) => `Promise`\<`Popup`\> |  |
| <a id="_createclosebutton"></a> `_createCloseButton` | (...`args`: \[\]) => `Promise`\<`void`\> |  |
| <a id="_onmouseup"></a> `_onMouseUp` | (...`args`: \[`MapMouseEvent`\]) => `Promise`\<`void`\> |  |
| <a id="_onmousemove"></a> `_onMouseMove` | (...`args`: \[`MapMouseEvent`\]) => `Promise`\<`void`\> |  |
| <a id="_ondrag"></a> `_onDrag` | (...`args`: \[`MapMouseEvent`\]) => `Promise`\<`void`\> |  |
| <a id="_focusfirstelement"></a> `_focusFirstElement` | (...`args`: \[\]) => `Promise`\<`void`\> |  |
| <a id="_onclose"></a> `_onClose` | (...`args`: \[\]) => `Promise`\<`void`\> |  |
