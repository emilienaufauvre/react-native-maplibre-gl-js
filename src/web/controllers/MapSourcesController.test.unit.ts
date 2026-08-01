import MapSourcesController from './MapSourcesController'
import {
  createFakeMap,
  createFakeReactNativeBridge,
  createMountMessage,
} from './MapSourcesController.mock'

describe('MapSourcesController', () => {
  let controller: MapSourcesController
  let bridge: ReturnType<typeof createFakeReactNativeBridge>
  let fakeMap: ReturnType<typeof createFakeMap>

  beforeEach(() => {
    jest.clearAllMocks()
    controller = new MapSourcesController()
    bridge = createFakeReactNativeBridge()
    fakeMap = createFakeMap()
  })

  describe('Given the style is not loaded and the "load" event was already emitted', () => {
    beforeEach(() => {
      fakeMap.setIsStyleLoaded(false)
      controller.handleMountMessage(
        createMountMessage({ id: 'source-1', layers: [{ id: 'layer-1' }] }),
        bridge,
        fakeMap.map,
      )
    })

    describe('When the mount message is received', () => {
      test('Then the source is not added yet', () => {
        expect(fakeMap.getLayersOrder()).toEqual([])
      })
    })

    describe('When "styledata" is emitted and the style became loaded', () => {
      beforeEach(() => {
        fakeMap.setIsStyleLoaded(true)
        fakeMap.emit('styledata')
      })

      test('Then the source and its layers are added', () => {
        expect(fakeMap.map.getSource('source-1')).toBeDefined()
        expect(fakeMap.getLayersOrder()).toEqual(['layer-1'])
      })
    })

    describe('When "idle" is emitted and the style became loaded', () => {
      beforeEach(() => {
        fakeMap.setIsStyleLoaded(true)
        fakeMap.emit('idle')
      })

      test('Then the source and its layers are added', () => {
        expect(fakeMap.getLayersOrder()).toEqual(['layer-1'])
      })
    })
  })

  describe('Given the style is loaded', () => {
    beforeEach(() => {
      fakeMap.setIsStyleLoaded(true)
    })

    describe('When a layer declares a "beforeId" that does not exist yet', () => {
      beforeEach(() => {
        controller.handleMountMessage(
          createMountMessage({
            id: 'source-1',
            layers: [{ id: 'layer-1', beforeId: 'layer-2' }],
          }),
          bridge,
          fakeMap.map,
        )
      })

      test('Then the layer is added on top instead of being dropped', () => {
        expect(fakeMap.getLayersOrder()).toEqual(['layer-1'])
        expect(fakeMap.errors).toEqual([])
      })

      describe('When the anchor is added later by another source', () => {
        beforeEach(() => {
          controller.handleMountMessage(
            createMountMessage({ id: 'source-2', layers: [{ id: 'layer-2' }] }),
            bridge,
            fakeMap.map,
          )
        })

        test('Then the layer is moved back below its anchor', () => {
          expect(fakeMap.getLayersOrder()).toEqual(['layer-1', 'layer-2'])
        })

        test('Then no destructive move was attempted', () => {
          expect(fakeMap.errors).toEqual([])
        })
      })
    })

    describe('When a whole stack is mounted bottom-up, each layer anchored to the one above', () => {
      beforeEach(() => {
        controller.handleMountMessage(
          createMountMessage({
            id: 'source-bottom',
            layers: [{ id: 'bottom', beforeId: 'middle' }],
          }),
          bridge,
          fakeMap.map,
        )
        controller.handleMountMessage(
          createMountMessage({
            id: 'source-middle',
            layers: [{ id: 'middle', beforeId: 'top' }],
          }),
          bridge,
          fakeMap.map,
        )
        controller.handleMountMessage(
          createMountMessage({
            id: 'source-top',
            layers: [{ id: 'top' }],
          }),
          bridge,
          fakeMap.map,
        )
      })

      test('Then the declared order is restored', () => {
        expect(fakeMap.getLayersOrder()).toEqual(['bottom', 'middle', 'top'])
      })

      describe('When the middle source is unmounted and mounted back', () => {
        beforeEach(() => {
          controller.handleUnmountMessage(
            {
              type: 'mapSourceUnmount',
              payload: { sourceId: 'source-middle' },
            } as any,
            bridge,
            fakeMap.map,
          )
          controller.handleMountMessage(
            createMountMessage({
              id: 'source-middle',
              layers: [{ id: 'middle', beforeId: 'top' }],
            }),
            bridge,
            fakeMap.map,
          )
        })

        test('Then it lands back at its declared position instead of on top', () => {
          expect(fakeMap.getLayersOrder()).toEqual(['bottom', 'middle', 'top'])
        })
      })
    })

    describe('When a two-layer source is re-added on top of a later one', () => {
      beforeEach(() => {
        controller.handleMountMessage(
          createMountMessage({
            id: 'source-pair',
            layers: [
              { id: 'pair-bottom', beforeId: 'pair-top' },
              { id: 'pair-top', beforeId: 'last' },
            ],
          }),
          bridge,
          fakeMap.map,
        )
        controller.handleMountMessage(
          createMountMessage({ id: 'source-last', layers: [{ id: 'last' }] }),
          bridge,
          fakeMap.map,
        )
        controller.handleUnmountMessage(
          {
            type: 'mapSourceUnmount',
            payload: { sourceId: 'source-pair' },
          } as any,
          bridge,
          fakeMap.map,
        )
        controller.handleMountMessage(
          createMountMessage({
            id: 'source-pair',
            layers: [
              { id: 'pair-bottom', beforeId: 'pair-top' },
              { id: 'pair-top', beforeId: 'last' },
            ],
          }),
          bridge,
          fakeMap.map,
        )
      })

      test('Then both layers are put back in their declared order', () => {
        expect(fakeMap.getLayersOrder()).toEqual([
          'pair-bottom',
          'pair-top',
          'last',
        ])
      })
    })

    describe('When a source is unmounted then mounted back in the same batch', () => {
      beforeEach(() => {
        controller.handleMountMessage(
          createMountMessage({ id: 'source-1', layers: [{ id: 'layer-1' }] }),
          bridge,
          fakeMap.map,
        )
        controller.handleUnmountMessage(
          {
            type: 'mapSourceUnmount',
            payload: { sourceId: 'source-1' },
          } as any,
          bridge,
          fakeMap.map,
        )
        controller.handleMountMessage(
          createMountMessage({ id: 'source-1', layers: [{ id: 'layer-1' }] }),
          bridge,
          fakeMap.map,
        )
      })

      test('Then the source is present at the end', () => {
        expect(fakeMap.map.getSource('source-1')).toBeDefined()
        expect(fakeMap.getLayersOrder()).toEqual(['layer-1'])
      })
    })
  })

  describe('Given messages arrive before the style is loaded', () => {
    beforeEach(() => {
      fakeMap.setIsStyleLoaded(false)
      controller.handleMountMessage(
        createMountMessage({ id: 'source-1', layers: [{ id: 'layer-1' }] }),
        bridge,
        fakeMap.map,
      )
      controller.handleUnmountMessage(
        { type: 'mapSourceUnmount', payload: { sourceId: 'source-1' } } as any,
        bridge,
        fakeMap.map,
      )
    })

    describe('When the style becomes ready', () => {
      beforeEach(() => {
        fakeMap.setIsStyleLoaded(true)
        fakeMap.emit('styledata')
      })

      test('Then the messages are applied in their dispatch order', () => {
        expect(fakeMap.map.getSource('source-1')).toBeUndefined()
        expect(fakeMap.getLayersOrder()).toEqual([])
      })
    })
  })
})
