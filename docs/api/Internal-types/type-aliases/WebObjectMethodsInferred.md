[react-native-maplibre-gl-js](../../index.md) / [Internal types](../index.md) / WebObjectMethodsInferred

# WebObjectMethodsInferred\<WebObject, ReplacedMethods\>

> **WebObjectMethodsInferred**\<`WebObject`, `ReplacedMethods`\> = `Merge`\<`AllMethodsToAsyncMethods`\<`Merge`\<`OnlyMethods`\<`WebObject`\>, `ReplacedMethods`\>\>, \{ `getId`: () => `string`; \}\>

Defined in: [src/react-native/components-factory/createWebObjectAsComponent.types.ts:152](https://github.com/emilienaufauvre/react-native-maplibre-gl-js/blob/main/src/react-native/components-factory/createWebObjectAsComponent.types.ts#L152)

Methods that are used to call web object methods from the RN world.
Filter out those methods that cannot be used from the RN world and replace
them with the given replacements (e.g., Marker.setPopup cannot be used
because we cannot instantiate a web Popup object in RN, therefore, we
override it to allow the usage of a React Native Popup object).
The goal of this type is to provide all the web methods of the object
within the RN world as a 1:1 mapping.
All methods are transformed into async ones that return a Promise of the
original return type.
To be used with the associated proxy to make the call to the methods
effective.

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `WebObject` | - |
| `ReplacedMethods` *extends* `{ [K in keyof OnlyMethods<WebObject>]?: (args: any[]) => any }` | \{ \} |
