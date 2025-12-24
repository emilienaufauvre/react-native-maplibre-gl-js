import { render, act } from '@testing-library/react-native'
import { jest } from '@jest/globals'
import useMapAtoms from './useMapAtoms'

describe('useMapAtoms', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Given a Probe using useMapAtoms is rendered', () => {
    const createWebViewMock = () => ({ postMessage: jest.fn() })
    let atoms: ReturnType<typeof useMapAtoms>

    beforeEach(() => {
      /**
       * Probe that uses useMapAtoms.
       */
      const Probe = () => {
        atoms = useMapAtoms()
        return null
      }
      render(<Probe />)
    })

    describe('When nothing', () => {
      test('Then it exposes the initial atom values', () => {
        expect(atoms).toBeTruthy()
        expect(atoms.isWebWorldReady).toBe(false)
        expect(atoms.isMapMountMessageReady).toBe(false)
      })
    })

    describe('When multiple messages are queued, including a map mount, and then flushed after the web world is ready', () => {
      let webView: { postMessage: jest.Mock }
      const messages = [
        { type: 'foo', payload: { any: 1 } },
        {
          type: 'webObjectMount',
          payload: {
            objectId: 'map-1',
            objectType: 'map',
            options: {},
            listeners: {},
          },
        },
        { type: 'bar', payload: { any: 'a' } },
      ]

      beforeEach(() => {
        webView = createWebViewMock()
        act(() => {
          messages.forEach((item) => atoms.dispatchMessage(item as any))
          atoms.setWebView(webView as any)
          atoms.setIsWebWorldReady(true)
          atoms.flushMessages()
        })
      })

      test('Then all messages are flushed, with the map mount message sent first', () => {
        expect(webView.postMessage).toHaveBeenCalledTimes(messages.length)
        const [first] = (webView.postMessage as jest.Mock).mock.calls
        expect(first?.[0]).toContain('"type":"webObjectMount"')
        expect(first?.[0]).toContain('"objectType":"map"')
      })
    })

    describe('When flush is called with no message queued', () => {
      beforeEach(() => {
        act(() => atoms.flushMessages())
      })
      test('Then nothing was sent', () => {
        const webView = createWebViewMock()
        expect(webView.postMessage).not.toHaveBeenCalled()
      })
    })

    describe('When a message is queue, and the queue is flushed, but the web world is not ready', () => {
      beforeEach(() => {
        act(() => atoms.dispatchMessage({ type: 'noop', payload: {} } as any))
        act(() => atoms.flushMessages())
      })
      test('Then nothing was sent', () => {
        const webView = createWebViewMock()
        expect(webView.postMessage).not.toHaveBeenCalled()
      })
    })

    describe('When web objects listeners are set, retrieved, and deleted', () => {
      test('Then get returns the set value and delete removes it', () => {
        act(() =>
          atoms.setWebObjectListeners({
            objectId: 'obj-1',
            listeners: { onTap: 'tapFunction' } as any,
          }),
        )
        let got: any
        act(() => {
          const get = atoms.getWebObjectListeners as unknown as (
            arg: any,
          ) => any
          got = get({ objectId: 'obj-1' })
        })
        expect(got).toEqual({ onTap: 'tapFunction' })
        act(() => atoms.deleteWebObjectListeners({ objectId: 'obj-1' }))
        act(() => {
          const get = atoms.getWebObjectListeners as unknown as (
            arg: any,
          ) => any
          got = get({ objectId: 'obj-1' })
        })
        expect(got).toBeUndefined()
      })
    })

    describe('When map sources listeners are set, retrieved, and deleted', () => {
      test('Then get returns the set value and delete removes it', () => {
        act(() =>
          atoms.setMapSourceListeners({
            sourceId: 'src-1',
            listeners: [
              { layerId: 'layer-1', listeners: { onTap: 'tapFunction' } },
            ] as any,
          }),
        )
        let got: any
        act(() => {
          const get = atoms.getMapSourceListeners as unknown as (
            arg: any,
          ) => any
          got = get({ sourceId: 'src-1', layerId: 'layer-1' })
        })
        expect(got).toEqual({ onTap: 'tapFunction' })
        act(() => atoms.deleteMapSourceListeners({ sourceId: 'src-1' }))
        act(() => {
          const get = atoms.getMapSourceListeners as unknown as (
            arg: any,
          ) => any
          got = get({ sourceId: 'src-1', layerId: 'layer-1' })
        })
        expect(got).toBeUndefined()
      })
    })

    describe('When an empty pending method response is created', () => {
      let resolved: any
      beforeEach(() => {
        atoms.setWebObjectPendingMethodResponse({
          requestId: 'req-1',
          resolve: (r) => (resolved = r),
        })
      })

      test('Then the response can be resolved and deleted', () => {
        expect(resolved).toBeUndefined()
        act(() =>
          atoms.resolveWebObjectPendingMethodResponse({
            requestId: 'req-1',
            result: { ok: true },
          }),
        )
        expect(resolved).toEqual({ ok: true })
        act(() => atoms.deleteWebObjectPendingMethodResponse('req-1'))
        expect(resolved).toEqual({ ok: true })
      })
    })
  })
})
