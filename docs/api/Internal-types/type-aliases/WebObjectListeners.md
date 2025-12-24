[react-native-maplibre-gl-js](../../index.md) / [Internal types](../index.md) / WebObjectListeners

# WebObjectListeners

> **WebObjectListeners** = [`WebObjectListenersDefault`](WebObjectListenersDefault.md) & [`WebObjectListenersWeb`](WebObjectListenersWeb.md)

Defined in: [src/react-native/components-factories/web-objects/createWebObjectAsComponent.types.ts:80](https://github.com/emilienaufauvre/react-native-maplibre-gl-js/blob/main/src/react-native/components-factories/web-objects/createWebObjectAsComponent.types.ts#L80)

Listeners that can be set by a component on the corresponding web object
events.
Event can be emitted by the web object itself, its HTML element, or be
specific to a map layer (if the object is the map).
By default, the mount/unmount events are available (they are custom, added
on top of the `MapLibre GL JS` events).

Note: sadly, listeners cannot be inferred from the MapLibre GL JS library.
Therefore, if a new listener is added within the library, it must also be
added here.
