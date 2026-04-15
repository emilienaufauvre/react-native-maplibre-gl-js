[react-native-maplibre-gl-js](../../index.md) / [Public API](../index.md) / WebMessageOptions

# WebMessageOptions

> **WebMessageOptions** = \{ `flushIntervalMs?`: `number`; `keepOnlyLastMessagePerType?`: `boolean`; \}

Defined in: [src/react-native/components/core/MapProvider/MapProvider.types.ts:91](https://github.com/emilienaufauvre/react-native-maplibre-gl-js/blob/main/src/react-native/components/core/MapProvider/MapProvider.types.ts#L91)

Options on how messages from the Web are buffered and dispatched to RN.

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="property-flushintervalms"></a> `flushIntervalMs?` | `number` | Interval (in milliseconds) at which buffered messages from the Web are flushed and sent as a batch. | [src/react-native/components/core/MapProvider/MapProvider.types.ts:96](https://github.com/emilienaufauvre/react-native-maplibre-gl-js/blob/main/src/react-native/components/core/MapProvider/MapProvider.types.ts#L96) |
| <a id="property-keeponlylastmessagepertype"></a> `keepOnlyLastMessagePerType?` | `boolean` | When enabled, Web messages of the same type are deduplicated within the buffer, keeping only the most recent message of each type before dispatching. This applies only to event messages (e.g., if a marker received two clicks during the flush interval, only the last one is returned). If false, all messages are kept in the buffer. This may impact performances if a listener sends many messages of the same type quickly (e.g., the "move" listener of a Map object). | [src/react-native/components/core/MapProvider/MapProvider.types.ts:107](https://github.com/emilienaufauvre/react-native-maplibre-gl-js/blob/main/src/react-native/components/core/MapProvider/MapProvider.types.ts#L107) |
