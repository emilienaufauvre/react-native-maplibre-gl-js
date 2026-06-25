[react-native-maplibre-gl-js](../../index.md) / [Internal types](../index.md) / PopupMethods

# PopupMethods

Defined in: [src/react-native/components/web-objects/Popup/Popup.types.ts:58](https://github.com/emilienaufauvre/react-native-maplibre-gl-js/blob/main/src/react-native/components/web-objects/Popup/Popup.types.ts#L58)

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="property-getid"></a> `getId` | () => `string` |  |
| <a id="property-off"></a> `off` | (...`args`: \[`string`, `Listener`\]) => `Promise`\<`Popup`\> |  |
| <a id="property-remove"></a> `remove` | (...`args`: \[\]) => `Promise`\<`Popup`\> |  |
| <a id="property-on"></a> `on` | (...`args`: \[`string`, `Listener`\]) => `Promise`\<`Subscription`\> |  |
| <a id="property-once"></a> `once` | (...`args`: \[`string`, `Listener`\]) => `Promise`\<`Promise`\<`any`\> \| `Popup`\> |  |
| <a id="property-_update"></a> `_update` | (...`args`: \[`MapMouseEvent` \| `MapLibreEvent`\<`unknown`\>\]) => `Promise`\<`void`\> |  |
| <a id="property-setpadding"></a> `setPadding` | (...`args`: \[`PaddingOptions`\]) => `Promise`\<`void`\> |  |
| <a id="property-_eventedparentdata"></a> `_eventedParentData` | (...`args`: `unknown`[]) => `Promise`\<`unknown`\> |  |
| <a id="property-fire"></a> `fire` | (...`args`: \[`string` \| `Event$1`, `any`\]) => `Promise`\<`Popup`\> |  |
| <a id="property-listens"></a> `listens` | (...`args`: \[`string`\]) => `Promise`\<`boolean`\> |  |
| <a id="property-seteventedparent"></a> `setEventedParent` | (...`args`: \[`string`\]) => `Promise`\<`Promise`\<`void`\>\> |  |
| <a id="property-addto"></a> `addTo` | (...`args`: \[\]) => `Promise`\<`Promise`\<`void`\>\> |  |
| <a id="property-getlnglat"></a> `getLngLat` | (...`args`: \[\]) => `Promise`\<`LngLat`\> |  |
| <a id="property-setlnglat"></a> `setLngLat` | (...`args`: \[`LngLatLike`\]) => `Promise`\<`Popup`\> |  |
| <a id="property-getelement"></a> `getElement` | (...`args`: \[\]) => `Promise`\<`HTMLElement`\> |  |
| <a id="property-setsubpixelpositioning"></a> `setSubpixelPositioning` | (...`args`: \[`boolean`\]) => `Promise`\<`void`\> |  |
| <a id="property-_updateopacity"></a> `_updateOpacity` | (...`args`: \[\]) => `Promise`\<`void`\> |  |
| <a id="property-setoffset"></a> `setOffset` | (...`args`: \[`Offset`\]) => `Promise`\<`Popup`\> |  |
| <a id="property-addclassname"></a> `addClassName` | (...`args`: \[`string`\]) => `Promise`\<`Popup`\> |  |
| <a id="property-removeclassname"></a> `removeClassName` | (...`args`: \[`string`\]) => `Promise`\<`Popup`\> |  |
| <a id="property-toggleclassname"></a> `toggleClassName` | (...`args`: \[`string`\]) => `Promise`\<`boolean` \| `undefined`\> |  |
| <a id="property-setdomcontent"></a> `setDOMContent` | (...`args`: \[`HTMLElementDescriptor`\]) => `Promise`\<`Promise`\<`void`\>\> |  |
| <a id="property-isopen"></a> `isOpen` | (...`args`: \[\]) => `Promise`\<`boolean`\> |  |
| <a id="property-trackpointer"></a> `trackPointer` | (...`args`: \[\]) => `Promise`\<`Popup`\> |  |
| <a id="property-settext"></a> `setText` | (...`args`: \[`string`\]) => `Promise`\<`Popup`\> |  |
| <a id="property-sethtml"></a> `setHTML` | (...`args`: \[`string`\]) => `Promise`\<`Popup`\> |  |
| <a id="property-getmaxwidth"></a> `getMaxWidth` | (...`args`: \[\]) => `Promise`\<`string`\> |  |
| <a id="property-setmaxwidth"></a> `setMaxWidth` | (...`args`: \[`string`\]) => `Promise`\<`Popup`\> |  |
| <a id="property-_createclosebutton"></a> `_createCloseButton` | (...`args`: \[\]) => `Promise`\<`void`\> |  |
| <a id="property-_focusfirstelement"></a> `_focusFirstElement` | (...`args`: \[\]) => `Promise`\<`void`\> |  |
| <a id="property-_onclose"></a> `_onClose` | (...`args`: \[\]) => `Promise`\<`void`\> |  |
