[**react-native-maplibre-gl-js**](../../index.md)

***

[react-native-maplibre-gl-js](../../index.md) / [Internal types](../index.md) / WebObjectListeners

# Type Alias: WebObjectListeners

> **WebObjectListeners** = [`WebObjectListenersDefault`](WebObjectListenersDefault.md) & [`WebObjectListenersWeb`](WebObjectListenersWeb.md)

Defined in: [react-native/components-factory/createWebObjectAsComponent.types.ts:57](https://github.com/emilienaufauvre/react-native-maplibre-gl-js/blob/acd18309aaa49606c0d1ba537b884684413acbc9/src/react-native/components-factory/createWebObjectAsComponent.types.ts#L57)

Listeners that can be set by a component on the corresponding web object
events.
Event can be emitted by the web object itself, its HTML element, or be
specific to a map layer (if the object is the map).
By default, the mount/unmount events are available (they are custom, added
on top of the MapLibre GL JS events).

Note: sadly, listeners cannot be inferred as Methods and Options, therefore,
when adding a new listener, one must ensure that the listeners correspond to
the real web object events.
