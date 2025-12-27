[react-native-maplibre-gl-js](../index.md) / Internal types

# Internal types

Internal types exposed for the documentation, but not by the public API.

## Map types

| Interface | Description |
| ------ | ------ |
| [MapMethods](interfaces/MapMethods.md) | - |
| [MapOptions](interfaces/MapOptions.md) | - |
| [MapListeners](interfaces/MapListeners.md) | - |

## Marker types

| Interface | Description |
| ------ | ------ |
| [MarkerMethods](interfaces/MarkerMethods.md) | - |
| [MarkerOptions](interfaces/MarkerOptions.md) | - |
| [MarkerListeners](interfaces/MarkerListeners.md) | - |

## Popup types

| Interface | Description |
| ------ | ------ |
| [PopupMethods](interfaces/PopupMethods.md) | - |
| [PopupOptions](interfaces/PopupOptions.md) | - |
| [PopupListeners](interfaces/PopupListeners.md) | - |

## Web object abstraction types

| Name | Description |
| ------ | ------ |
| [WebObjectType](type-aliases/WebObjectType.md) | The web objects that are supported by this library. A string version to be used as an identifier on the RN side (cannot use MapLibre classes directly). Must correspond to `WebObjectClass`. |
| [WebObjectClass](type-aliases/WebObjectClass.md) | The web objects that are supported by this library. A class version to be used on the web side. Must correspond to `WebObjectType`. |
| [WebObjectComponent](type-aliases/WebObjectComponent.md) | React Native component that corresponds and perform actions with a web object in the web world. |
| [WebObjectRef](type-aliases/WebObjectRef.md) | React Native ref of a component (corresponds to the web object methods in the web world). |
| [WebObjectProps](interfaces/WebObjectProps.md) | React Native props of a component (used to instantiate the web object in the web world). |
| [WebObjectListeners](type-aliases/WebObjectListeners.md) | Listeners that can be set by a component on the corresponding web object events. Event can be emitted by the web object itself, its HTML element, or be specific to a map layer (if the object is the map). By default, the mount/unmount events are available (they are custom, added on top of the `MapLibre GL JS` events). |
| [WebObjectListenersDefault](type-aliases/WebObjectListenersDefault.md) | Custom events introduced by this library, executed once the web object is (un)mounted to the map. |
| [WebObjectListenersWeb](type-aliases/WebObjectListenersWeb.md) | `MapLibre GL JS` events as defined in the official documentation of the object. |
| [WebObjectListenerOnRN](type-aliases/WebObjectListenerOnRN.md) | A listener on an event introduced by the React Native usage. |
| [WebObjectListenerOnObject](type-aliases/WebObjectListenerOnObject.md) | A listener to be set on an event emitted by the web object. |
| [WebObjectListenerOnMapLayer](type-aliases/WebObjectListenerOnMapLayer.md) | A listener to be set on an event emitted by the web object, but specific to a map layer. |
| [WebObjectListenerOnHTMLElement](type-aliases/WebObjectListenerOnHTMLElement.md) | A listener to be set on an event emitted by the HTMLElement associated with the web object. |
| [WebObjectOptionsInferred](type-aliases/WebObjectOptionsInferred.md) | Options that are used to instantiate a web object. Filter out those options that cannot be set from the RN world and replace them with the given replacements (e.g., HTMLElement that cannot be instantiated in RN is replaced by HTMLElementDescriptor). Also, remove the ones that should not be specified and used. |
| [WebObjectMethodsInferred](type-aliases/WebObjectMethodsInferred.md) | Methods that are used to call web object methods from the RN world. Filter out those methods that cannot be used from the RN world and replace them with the given replacements (e.g., Marker.setPopup cannot be used because we cannot instantiate a web Popup object in RN, therefore, we override it to allow the usage of a React Native Popup object). The goal of this type is to provide all the web methods of the object within the RN world as a 1:1 mapping. All methods are transformed into async ones that return a Promise of the original return type. To be used with the associated proxy to make the call to the methods effective. |
| [WebObjectId](type-aliases/WebObjectId.md) | UID of a web object in the web world. |
| [WebObjectMethodCallRequestId](type-aliases/WebObjectMethodCallRequestId.md) | UID of a request for a web object method to be executed. |

## Map source abstraction types

| Name | Description |
| ------ | ------ |
| [MapSourceClass](type-aliases/MapSourceClass.md) | The map sources that are supported by this library. A class version to be used on the web side. |
| [MapSourceComponent](type-aliases/MapSourceComponent.md) | React Native component that corresponds and perform actions with a map source and its layers in the web world. |
| [MapSourceProps](interfaces/MapSourceProps.md) | React Native props of a component (used to instantiate the map source and layer(s) in the web world). |
| [MapSourceLayer](interfaces/MapSourceLayer.md) | A layer specification that can be added to a map source. |
| [MapSourceLayerListeners](interfaces/MapSourceLayerListeners.md) | Listeners that can be set by a component on the corresponding map layer events. By default, the mount/unmount events are available (they are custom, added on top of the `MapLibre GL JS` events). |
| [MapSourceLayerWithSourceId](type-aliases/MapSourceLayerWithSourceId.md) | A layer specification that does not contain the source property (added automatically to match the current source id). |
| [MapSourceId](type-aliases/MapSourceId.md) | UID of a map source in the web world. |
| [MapSourceLayerId](type-aliases/MapSourceLayerId.md) | UID of a map source layer in the web world. |
