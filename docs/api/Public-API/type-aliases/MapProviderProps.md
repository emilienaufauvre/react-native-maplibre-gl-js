[react-native-maplibre-gl-js](../../index.md) / [Public API](../index.md) / MapProviderProps

# MapProviderProps

> **MapProviderProps** = \{ `style?`: `StyleProp`\<`ViewStyle`\>; `webViewStyle?`: `StyleProp`\<`ViewStyle`\>; `cssStyles?`: `string` \| `string`[]; `rnLoggerEnabled?`: `boolean`; `webLoggerEnabled?`: `boolean`; `webMessageOptions?`: [`WebMessageOptions`](WebMessageOptions.md); `children?`: `ReactNode`; `nativeScripts?`: `string`[]; \}

Defined in: [src/react-native/components/core/MapProvider/MapProvider.types.ts:9](https://github.com/emilienaufauvre/react-native-maplibre-gl-js/blob/main/src/react-native/components/core/MapProvider/MapProvider.types.ts#L9)

MapProvider component props.

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="style"></a> `style?` | `StyleProp`\<`ViewStyle`\> | Style of the view. | [src/react-native/components/core/MapProvider/MapProvider.types.ts:13](https://github.com/emilienaufauvre/react-native-maplibre-gl-js/blob/main/src/react-native/components/core/MapProvider/MapProvider.types.ts#L13) |
| <a id="webviewstyle"></a> `webViewStyle?` | `StyleProp`\<`ViewStyle`\> | Style of the inner WebView. | [src/react-native/components/core/MapProvider/MapProvider.types.ts:17](https://github.com/emilienaufauvre/react-native-maplibre-gl-js/blob/main/src/react-native/components/core/MapProvider/MapProvider.types.ts#L17) |
| <a id="cssstyles"></a> `cssStyles?` | `string` \| `string`[] | CSS (or list of CSS) to inject globally into the WebView document head. Useful to share classes/animations across Marker components and/or other elements that use HTMLElement (descriptors). | [src/react-native/components/core/MapProvider/MapProvider.types.ts:23](https://github.com/emilienaufauvre/react-native-maplibre-gl-js/blob/main/src/react-native/components/core/MapProvider/MapProvider.types.ts#L23) |
| <a id="rnloggerenabled"></a> `rnLoggerEnabled?` | `boolean` | Enable logs originating from RN (RNLogger). Default to false. | [src/react-native/components/core/MapProvider/MapProvider.types.ts:28](https://github.com/emilienaufauvre/react-native-maplibre-gl-js/blob/main/src/react-native/components/core/MapProvider/MapProvider.types.ts#L28) |
| <a id="webloggerenabled"></a> `webLoggerEnabled?` | `boolean` | Enable logs originating from the Web (WebLogger). Default to false. When disabled, messages of the type "console" coming from the ebView are ignored. If enabled, performances may be impacted. | [src/react-native/components/core/MapProvider/MapProvider.types.ts:36](https://github.com/emilienaufauvre/react-native-maplibre-gl-js/blob/main/src/react-native/components/core/MapProvider/MapProvider.types.ts#L36) |
| <a id="webmessageoptions"></a> `webMessageOptions?` | [`WebMessageOptions`](WebMessageOptions.md) | Control how Web messages are buffered and dispatched. These options define whether performance or delivery precision is prioritized. | [src/react-native/components/core/MapProvider/MapProvider.types.ts:42](https://github.com/emilienaufauvre/react-native-maplibre-gl-js/blob/main/src/react-native/components/core/MapProvider/MapProvider.types.ts#L42) |
| <a id="children"></a> `children?` | `ReactNode` | The map elements (e.g., Map) as direct children. | [src/react-native/components/core/MapProvider/MapProvider.types.ts:46](https://github.com/emilienaufauvre/react-native-maplibre-gl-js/blob/main/src/react-native/components/core/MapProvider/MapProvider.types.ts#L46) |
| <a id="nativescripts"></a> `nativeScripts?` | `string`[] | A list of native scripts to inject into the WebView, allowing you to add custom web functionality or improve performance for frequently executed calls. Some global objects are made available by default in the WebView context, such as the maplibre-gl-js Map. These globals are: - `window.__RNML_CONTROLLER`: the main controller to interact with the map. - `window.__RNML_BRIDGE`: the bridge to send messages to RN. To be compliant with the injection mechanism, a script must be an IIFE that returns true. | [src/react-native/components/core/MapProvider/MapProvider.types.ts:59](https://github.com/emilienaufauvre/react-native-maplibre-gl-js/blob/main/src/react-native/components/core/MapProvider/MapProvider.types.ts#L59) |
