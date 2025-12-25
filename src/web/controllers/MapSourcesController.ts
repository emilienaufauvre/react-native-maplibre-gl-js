import type { MessageFromRNToWeb } from '../../communication/messages.types'
import type ReactNativeBridge from '../bridge/ReactNativeBridge'
import type {
  MapSourceId,
  MapSourceLayer,
  MapSourceLayerListeners,
  MapSourceProps,
} from '../../react-native/components-factories/map-sources/createMapSourceAsComponent.types'
import maplibregl, { type LayerSpecification } from 'maplibre-gl'

export default class MapSourcesController {
  #sources = new Map<string, MapSourceProps<any>>()

  addExistingSourcesToMap = (
    reactNativeBridge: ReactNativeBridge,
    map: maplibregl.Map,
  ) => {
    this.#sources.entries().forEach(([, source]) => {
      if (map.isStyleLoaded()) {
        this.#addSourceAndItsLayers(source, reactNativeBridge, map)
        this.#setSourceListeners(source, reactNativeBridge, map)
      } else {
        map.once('load', () => {
          this.#addSourceAndItsLayers(source, reactNativeBridge, map)
          this.#setSourceListeners(source, reactNativeBridge, map)
        })
      }
    })
  }

  handleMountMessage = (
    message: Extract<MessageFromRNToWeb, { type: 'mapSourceMount' }>,
    reactNativeBridge: ReactNativeBridge,
    map: maplibregl.Map,
  ) => {
    const run = (mapReady: maplibregl.Map) => {
      this.#addSourceAndItsLayers(message.payload, reactNativeBridge, mapReady)
      this.#setSourceListeners(message.payload, reactNativeBridge, mapReady)
      this.#sources.set(message.payload.id, message.payload)
    }
    // Need the map to be loaded before adding the source and its layers.
    if (map.isStyleLoaded()) {
      run(map)
    } else {
      map.once('load', () => run(map))
    }
  }

  handleUpdateMessage = (
    message: Extract<MessageFromRNToWeb, { type: 'mapSourceUpdate' }>,
    reactNativeBridge: ReactNativeBridge,
    map: maplibregl.Map,
  ) => {
    const run = (mapReady: maplibregl.Map) => {
      this.#setSourceListeners(message.payload, reactNativeBridge, mapReady)
      this.#sources.set(message.payload.id, message.payload)
    }
    // Need the map to be loaded before adding the source and its layers.
    if (map.isStyleLoaded()) {
      run(map)
    } else {
      map.once('load', () => run(map))
    }
  }

  handleUnmountMessage = (
    message: Extract<MessageFromRNToWeb, { type: 'mapSourceUnmount' }>,
    reactNativeBridge: ReactNativeBridge,
    map: maplibregl.Map,
  ) => {
    const source = this.#sources.get(message.payload.sourceId)
    if (!source) {
      return
    }

    this.#removeSourceAndItsLayers(
      map,
      reactNativeBridge,
      message.payload.sourceId,
    )
    this.#sources.delete(message.payload.sourceId)
  }

  #addSourceAndItsLayers = (
    source: MapSourceProps<any>,
    reactNativeBridge: ReactNativeBridge,
    map: maplibregl.Map,
  ) => {
    map.addSource(source.id, source.source)
    source.layers.forEach(({ layer, beforeId }: MapSourceLayer) => {
      // Add the layer to the map.
      map.addLayer(
        {
          source: source.id,
          ...layer,
        } as maplibregl.AddLayerObject,
        beforeId,
      )
      // Send the "mount" event to the React Native listener.
      reactNativeBridge.postMessage({
        type: 'mapSourceListenerEvent',
        payload: {
          sourceId: source.id,
          layerId: layer.id,
          eventName: 'mount',
        },
      })
    })
  }

  #removeSourceAndItsLayers = (
    map: maplibregl.Map,
    reactNativeBridge: ReactNativeBridge,
    sourceId: MapSourceId,
  ) => {
    const style = map.getStyle()

    if (style && style.layers) {
      // Find the associated layers mounted on the map
      const layerIds = style.layers
        .filter(
          (layer): layer is LayerSpecification & { source: string } =>
            'source' in layer && layer.source === sourceId,
        )
        .map((layer) => layer.id)
      layerIds.forEach((id) => {
        // Remove the layer from the map.
        if (map.getLayer(id)) {
          map.removeLayer(id)
        }
        // Send the "unmount" event to the React Native listener.
        reactNativeBridge.postMessage({
          type: 'mapSourceListenerEvent',
          payload: {
            sourceId,
            layerId: id,
            eventName: 'unmount',
          },
        })
      })
    }

    if (map.getSource(sourceId)) {
      map.removeSource(sourceId)
    }
  }

  #setSourceListeners = (
    source: MapSourceProps<any>,
    reactNativeBridge: ReactNativeBridge,
    map: maplibregl.Map,
  ) => {
    source.layers?.forEach(({ layer, listeners }: MapSourceLayer) => {
      Object.entries(listeners ?? {}).forEach(([eventName]) => {
        if (eventName === 'mount' || eventName === 'unmount') {
          return
        }

        const sendEventToReactNative = (event: any) => {
          // Remove circular references that cannot be serialized.
          delete event.target
          // Send the event to the React Native listener.
          reactNativeBridge.postMessage({
            type: 'mapSourceListenerEvent',
            payload: {
              sourceId: source.id,
              layerId: layer.id,
              eventName: eventName as keyof MapSourceLayerListeners,
              event,
            },
          })
        }

        map.on(
          eventName as keyof maplibregl.MapLayerEventType,
          layer.id,
          sendEventToReactNative,
        )
      })
    })
  }
}
