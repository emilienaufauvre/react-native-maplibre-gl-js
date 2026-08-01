import type { MessageFromRNToWeb } from '../../communication/messages.types'
import type ReactNativeBridge from '../bridge/ReactNativeBridge'
import type {
  MapSourceId,
  MapSourceLayer,
  MapSourceLayerId,
  MapSourceLayerListeners,
  MapSourceProps,
} from '../../react-native/components-factories/map-sources/createMapSourceAsComponent.types'
import maplibregl from 'maplibre-gl'
import { stableStringify } from '../../react-native/hooks/atoms/useMapAtoms.utils'
import WebLogger from '../logger/web-logger'

/**
 *
 */
export default class MapSourcesController {
  #sources = new Map<string, MapSourceProps<any>>()

  /**
   * The `beforeId` declared by every managed layer, i.e. the layer it must sit
   * directly below. `MapLibre GL JS` drops a layer whose `beforeId` does not
   * exist yet, so the anchor is remembered here and re-applied as soon as the
   * target appears.
   */
  #declaredBeforeIds = new Map<MapSourceLayerId, MapSourceLayerId>()

  /**
   * Operations waiting for the style to be ready. Kept as a single FIFO so that
   * the messages of a batch are always applied in their dispatch order.
   */
  #pendingOperations: (() => void)[] = []
  #isDrainScheduled = false

  /**
   * If the map object changed, add the existing sources and their layers to the
   * new map.
   * Note that everything must be recreated, including the listeners.
   * Send a mount event.
   */
  addExistingSourcesToMap = (
    reactNativeBridge: ReactNativeBridge,
    map: maplibregl.Map,
  ) => {
    this.#sources.entries().forEach(([, source]) => {
      this.#runWhenStyleReady(map, () => {
        this.#addSourceAndItsLayers(source, reactNativeBridge, map)
        this.#setSourceListeners(source, reactNativeBridge, map)
      })
    })
  }

  handleMountMessage = (
    message: Extract<MessageFromRNToWeb, { type: 'mapSourceMount' }>,
    reactNativeBridge: ReactNativeBridge,
    map: maplibregl.Map,
  ) => {
    this.#runWhenStyleReady(map, () => {
      this.#addSourceAndItsLayers(message.payload, reactNativeBridge, map)
      this.#setSourceListeners(message.payload, reactNativeBridge, map)
      this.#sources.set(message.payload.id, message.payload)
    })
  }

  handleUpdateMessage = (
    message: Extract<MessageFromRNToWeb, { type: 'mapSourceUpdate' }>,
    reactNativeBridge: ReactNativeBridge,
    map: maplibregl.Map,
  ) => {
    this.#runWhenStyleReady(map, () => {
      this.#updateSourceAndItsLayers(message.payload, reactNativeBridge, map)
      this.#setSourceListeners(message.payload, reactNativeBridge, map)
      this.#sources.set(message.payload.id, message.payload)
    })
  }

  handleUnmountMessage = (
    message: Extract<MessageFromRNToWeb, { type: 'mapSourceUnmount' }>,
    reactNativeBridge: ReactNativeBridge,
    map: maplibregl.Map,
  ) => {
    this.#runWhenStyleReady(map, () => {
      this.#removeSourceAndItsLayers(
        message.payload.sourceId,
        reactNativeBridge,
        map,
      )
      this.#sources.delete(message.payload.sourceId)
    })
  }

  /**
   * Queue an operation and apply it as soon as the style can accept it.
   * The style must be loaded before sources and layers can be touched, but
   * `isStyleLoaded()` also goes back to false while tiles, glyphs or sprites
   * are loading — long after the one and only `load` event was emitted.
   * Waiting on `load` would therefore never resolve and the operation would be
   * lost, so the retry is armed on `styledata` and `idle`, both re-emitted.
   */
  #runWhenStyleReady = (map: maplibregl.Map, operation: () => void) => {
    this.#pendingOperations.push(operation)
    this.#drainPendingOperations(map)
  }

  #drainPendingOperations = (map: maplibregl.Map) => {
    if (!map.isStyleLoaded()) {
      if (!this.#isDrainScheduled) {
        this.#isDrainScheduled = true
        const retry = () => {
          this.#isDrainScheduled = false
          this.#drainPendingOperations(map)
        }
        map.once('styledata', retry)
        map.once('idle', retry)
      }
      return
    }

    while (this.#pendingOperations.length > 0) {
      this.#pendingOperations.shift()!()
    }

    this.#applyDeclaredLayerOrder(map)
  }

  /**
   * Put every managed layer back below the layer it declared as `beforeId`.
   * Layers are added by independent sources, so an anchor is often missing when
   * a layer is first added: it then lands on top and is moved into place here,
   * once the anchor exists. Repeated until the order stops changing, because
   * moving one layer can invalidate a pair that was already correct.
   */
  #applyDeclaredLayerOrder = (map: maplibregl.Map) => {
    for (let pass = 0; pass < this.#declaredBeforeIds.size; pass++) {
      let layersOrder = map.getLayersOrder()
      let hasMovedLayer = false

      this.#declaredBeforeIds.forEach((beforeId, layerId) => {
        // A layer must sit at a lower index than its anchor to be drawn below
        // it. Both must exist: `moveLayer` drops the layer from the order when
        // the anchor is missing.
        const layerIndex = layersOrder.indexOf(layerId)
        const beforeIndex = layersOrder.indexOf(beforeId)

        if (layerIndex === -1 || beforeIndex === -1) {
          return
        }
        if (layerIndex < beforeIndex) {
          return
        }

        map.moveLayer(layerId, beforeId)
        // Every move shifts the layers around it, so the next comparison of
        // this pass must be made against the order that move produced.
        layersOrder = map.getLayersOrder()
        hasMovedLayer = true
      })

      if (!hasMovedLayer) {
        return
      }
    }
  }

  #addSourceAndItsLayers = (
    props: MapSourceProps<any>,
    reactNativeBridge: ReactNativeBridge,
    map: maplibregl.Map,
  ) => {
    if (!map.getSource(props.id)) {
      map.addSource(props.id, props.source)
    }

    this.#addLayers(props, reactNativeBridge, map)
  }

  #updateSourceAndItsLayers = (
    props: MapSourceProps<any>,
    reactNativeBridge: ReactNativeBridge,
    map: maplibregl.Map,
  ) => {
    const oldSource = this.#sources.get(props.id)?.source
    const newSource = props.source

    const remountEverything = () => {
      this.#removeSourceAndItsLayers(props.id, reactNativeBridge, map)
      this.#addSourceAndItsLayers(props, reactNativeBridge, map)
    }

    if (
      newSource.type &&
      ['geojson', 'image', 'video', 'vector', 'raster'].includes(
        newSource.type,
      ) &&
      oldSource.type !== newSource.type
    ) {
      remountEverything()
      return
    }

    switch (newSource.type) {
      case 'geojson': {
        const prevNoData = { ...oldSource }
        const nextNoData = { ...newSource }
        delete prevNoData.data
        delete nextNoData.data

        // Update everything if a thing other than "data" changed.
        if (stableStringify(prevNoData) !== stableStringify(nextNoData)) {
          remountEverything()
          return
        }
        // Update only the data.
        if (
          stableStringify(oldSource.data) !== stableStringify(newSource.data)
        ) {
          const source = map.getSource(props.id) as maplibregl.GeoJSONSource
          source.setData(newSource.data)
        }
        break
      }
      case 'image': {
        // TODO optimization.
        remountEverything()
        return
      }
      case 'video': {
        // TODO optimization.
        remountEverything()
        return
      }
      case 'vector': {
        // TODO optimization.
        remountEverything()
        return
      }
      case 'raster': {
        // TODO optimization.
        remountEverything()
        return
      }
      default: {
        this.#removeSourceAndItsLayers(props.id, reactNativeBridge, map)
        return
      }
    }
    // Update the layers only if at least one changed (if one changed, the
    // orders of the layers might have changed, so we need to update all of
    // them). The declared "beforeId" is part of the comparison: it carries the
    // stacking order, so a change on it alone must still be applied.
    const oldLayersAsString = this.#getComparableLayers(
      this.#sources.get(props.id)?.layers,
    )
    const newLayersAsString = this.#getComparableLayers(props.layers)
    if (oldLayersAsString !== newLayersAsString) {
      this.#updateLayers(props, reactNativeBridge, map)
      return
    }
  }

  #getComparableLayers = (layers: MapSourceLayer[] | undefined) =>
    stableStringify(
      layers?.map(({ layer, beforeId }: MapSourceLayer) => ({
        layer,
        beforeId,
      })),
    )

  #removeSourceAndItsLayers = (
    sourceId: MapSourceId,
    reactNativeBridge: ReactNativeBridge,
    map: maplibregl.Map,
  ) => {
    this.#removeLayers(sourceId, reactNativeBridge, map)

    if (map.getSource(sourceId)) {
      map.removeSource(sourceId)
    }
  }

  #addLayers = (
    props: MapSourceProps<any>,
    reactNativeBridge: ReactNativeBridge,
    map: maplibregl.Map,
  ) => {
    props.layers.forEach(({ layer, beforeId }: MapSourceLayer) => {
      // Remember the declared anchor even when it cannot be honoured yet.
      if (beforeId) {
        this.#declaredBeforeIds.set(layer.id, beforeId)
      } else {
        this.#declaredBeforeIds.delete(layer.id)
      }

      // Add the layer to the map.
      if (!map.getLayer(layer.id)) {
        // `MapLibre GL JS` does not add the layer at all when "beforeId" points
        // to a layer that does not exist yet. Add it on top instead: the order
        // is restored by "#applyDeclaredLayerOrder" once the anchor is there.
        const isBeforeIdResolvable = Boolean(beforeId && map.getLayer(beforeId))

        if (beforeId && !isBeforeIdResolvable) {
          WebLogger.debug(
            'MapSourcesController',
            `Layer "${layer.id}" was added on top: its "beforeId" ("${beforeId}") does not exist yet.`,
          )
        }

        map.addLayer(
          {
            source: props.id,
            ...layer,
          } as maplibregl.AddLayerObject,
          isBeforeIdResolvable ? beforeId : undefined,
        )
        // Send the "mount" event to the React Native listener.
        reactNativeBridge.postMessage({
          type: 'mapSourceListenerEvent',
          payload: {
            sourceId: props.id,
            layerId: layer.id,
            eventName: 'mount',
          },
        })
      }
    })
  }

  #updateLayers = (
    props: MapSourceProps<any>,
    reactNativeBridge: ReactNativeBridge,
    map: maplibregl.Map,
  ) => {
    this.#removeLayers(props.id, reactNativeBridge, map)
    this.#addLayers(props, reactNativeBridge, map)
  }

  #removeLayers = (
    sourceId: MapSourceId,
    reactNativeBridge: ReactNativeBridge,
    map: maplibregl.Map,
  ) => {
    const layers = map
      .getLayersOrder()
      .filter((layerId) => map.getLayer(layerId)?.source === sourceId)
    layers.forEach((layerId) => {
      // Remove the layer from the map.
      if (map.getLayer(layerId)) {
        map.removeLayer(layerId)
      }
      this.#declaredBeforeIds.delete(layerId)
      // Send the "unmount" event to the React Native listener.
      reactNativeBridge.postMessage({
        type: 'mapSourceListenerEvent',
        payload: {
          sourceId,
          layerId,
          eventName: 'unmount',
        },
      })
    })
  }

  #setSourceListeners = (
    props: MapSourceProps<any>,
    reactNativeBridge: ReactNativeBridge,
    map: maplibregl.Map,
  ) => {
    props.layers?.forEach(({ layer, listeners }: MapSourceLayer) => {
      Object.entries(listeners ?? {}).forEach(([eventName]) => {
        // Skip RN listeners.
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
              sourceId: props.id,
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
