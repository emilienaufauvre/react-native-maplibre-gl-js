[react-native-maplibre-gl-js](../../index.md) / [Internal types](../index.md) / MapSourceLayerListeners

# MapSourceLayerListeners

> **MapSourceLayerListeners** = \{ `mount?`: `Listener`\<`void`\>; `unmount?`: `Listener`\<`void`\>; `mousedown?`: `Listener`\<`MapLayerMouseEvent`\>; `mouseup?`: `Listener`\<`MapLayerMouseEvent`\>; `mouseover?`: `Listener`\<`MapLayerMouseEvent`\>; `mouseout?`: `Listener`\<`MapLayerMouseEvent`\>; `mousemove?`: `Listener`\<`MapLayerMouseEvent`\>; `mouseenter?`: `Listener`\<`MapLayerMouseEvent`\>; `mouseleave?`: `Listener`\<`MapLayerMouseEvent`\>; `click?`: `Listener`\<`MapLayerMouseEvent`\>; `dblclick?`: `Listener`\<`MapLayerMouseEvent`\>; `contextmenu?`: `Listener`\<`MapLayerMouseEvent`\>; `touchstart?`: `Listener`\<`MapLayerTouchEvent`\>; `touchend?`: `Listener`\<`MapLayerTouchEvent`\>; `touchcancel?`: `Listener`\<`MapLayerTouchEvent`\>; \}

Defined in: [src/react-native/components-factories/map-sources/createMapSourceAsComponent.types.ts:79](https://github.com/emilienaufauvre/react-native-maplibre-gl-js/blob/main/src/react-native/components-factories/map-sources/createMapSourceAsComponent.types.ts#L79)

Listeners that can be set by a component on the corresponding map layer
events.
By default, the mount/unmount events are available (they are custom, added
on top of the `MapLibre GL JS` events).

Note: sadly, listeners cannot be inferred from the MapLibre GL JS library.
Therefore, if a new listener is added within the library, it must also be
added here.

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="mount"></a> `mount?` | `Listener`\<`void`\> | [src/react-native/components-factories/map-sources/createMapSourceAsComponent.types.ts:81](https://github.com/emilienaufauvre/react-native-maplibre-gl-js/blob/main/src/react-native/components-factories/map-sources/createMapSourceAsComponent.types.ts#L81) |
| <a id="unmount"></a> `unmount?` | `Listener`\<`void`\> | [src/react-native/components-factories/map-sources/createMapSourceAsComponent.types.ts:82](https://github.com/emilienaufauvre/react-native-maplibre-gl-js/blob/main/src/react-native/components-factories/map-sources/createMapSourceAsComponent.types.ts#L82) |
| <a id="mousedown"></a> `mousedown?` | `Listener`\<`MapLayerMouseEvent`\> | [src/react-native/components-factories/map-sources/createMapSourceAsComponent.types.ts:84](https://github.com/emilienaufauvre/react-native-maplibre-gl-js/blob/main/src/react-native/components-factories/map-sources/createMapSourceAsComponent.types.ts#L84) |
| <a id="mouseup"></a> `mouseup?` | `Listener`\<`MapLayerMouseEvent`\> | [src/react-native/components-factories/map-sources/createMapSourceAsComponent.types.ts:85](https://github.com/emilienaufauvre/react-native-maplibre-gl-js/blob/main/src/react-native/components-factories/map-sources/createMapSourceAsComponent.types.ts#L85) |
| <a id="mouseover"></a> `mouseover?` | `Listener`\<`MapLayerMouseEvent`\> | [src/react-native/components-factories/map-sources/createMapSourceAsComponent.types.ts:86](https://github.com/emilienaufauvre/react-native-maplibre-gl-js/blob/main/src/react-native/components-factories/map-sources/createMapSourceAsComponent.types.ts#L86) |
| <a id="mouseout"></a> `mouseout?` | `Listener`\<`MapLayerMouseEvent`\> | [src/react-native/components-factories/map-sources/createMapSourceAsComponent.types.ts:87](https://github.com/emilienaufauvre/react-native-maplibre-gl-js/blob/main/src/react-native/components-factories/map-sources/createMapSourceAsComponent.types.ts#L87) |
| <a id="mousemove"></a> `mousemove?` | `Listener`\<`MapLayerMouseEvent`\> | [src/react-native/components-factories/map-sources/createMapSourceAsComponent.types.ts:88](https://github.com/emilienaufauvre/react-native-maplibre-gl-js/blob/main/src/react-native/components-factories/map-sources/createMapSourceAsComponent.types.ts#L88) |
| <a id="mouseenter"></a> `mouseenter?` | `Listener`\<`MapLayerMouseEvent`\> | [src/react-native/components-factories/map-sources/createMapSourceAsComponent.types.ts:89](https://github.com/emilienaufauvre/react-native-maplibre-gl-js/blob/main/src/react-native/components-factories/map-sources/createMapSourceAsComponent.types.ts#L89) |
| <a id="mouseleave"></a> `mouseleave?` | `Listener`\<`MapLayerMouseEvent`\> | [src/react-native/components-factories/map-sources/createMapSourceAsComponent.types.ts:90](https://github.com/emilienaufauvre/react-native-maplibre-gl-js/blob/main/src/react-native/components-factories/map-sources/createMapSourceAsComponent.types.ts#L90) |
| <a id="click"></a> `click?` | `Listener`\<`MapLayerMouseEvent`\> | [src/react-native/components-factories/map-sources/createMapSourceAsComponent.types.ts:91](https://github.com/emilienaufauvre/react-native-maplibre-gl-js/blob/main/src/react-native/components-factories/map-sources/createMapSourceAsComponent.types.ts#L91) |
| <a id="dblclick"></a> `dblclick?` | `Listener`\<`MapLayerMouseEvent`\> | [src/react-native/components-factories/map-sources/createMapSourceAsComponent.types.ts:92](https://github.com/emilienaufauvre/react-native-maplibre-gl-js/blob/main/src/react-native/components-factories/map-sources/createMapSourceAsComponent.types.ts#L92) |
| <a id="contextmenu"></a> `contextmenu?` | `Listener`\<`MapLayerMouseEvent`\> | [src/react-native/components-factories/map-sources/createMapSourceAsComponent.types.ts:93](https://github.com/emilienaufauvre/react-native-maplibre-gl-js/blob/main/src/react-native/components-factories/map-sources/createMapSourceAsComponent.types.ts#L93) |
| <a id="touchstart"></a> `touchstart?` | `Listener`\<`MapLayerTouchEvent`\> | [src/react-native/components-factories/map-sources/createMapSourceAsComponent.types.ts:94](https://github.com/emilienaufauvre/react-native-maplibre-gl-js/blob/main/src/react-native/components-factories/map-sources/createMapSourceAsComponent.types.ts#L94) |
| <a id="touchend"></a> `touchend?` | `Listener`\<`MapLayerTouchEvent`\> | [src/react-native/components-factories/map-sources/createMapSourceAsComponent.types.ts:95](https://github.com/emilienaufauvre/react-native-maplibre-gl-js/blob/main/src/react-native/components-factories/map-sources/createMapSourceAsComponent.types.ts#L95) |
| <a id="touchcancel"></a> `touchcancel?` | `Listener`\<`MapLayerTouchEvent`\> | [src/react-native/components-factories/map-sources/createMapSourceAsComponent.types.ts:96](https://github.com/emilienaufauvre/react-native-maplibre-gl-js/blob/main/src/react-native/components-factories/map-sources/createMapSourceAsComponent.types.ts#L96) |
