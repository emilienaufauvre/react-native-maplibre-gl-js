import { View, Text } from 'react-native'
import { render, renderHook, screen } from '@testing-library/react-native'
import MapProvider from './MapProvider'
import { useWebMessageHandler } from './MapProvider.hooks'
import RNLogger from '../../../logger/rn-logger'
import {
  getMapSourceListenersMock,
  getWebObjectListenersMock,
  resolveWebObjectPendingMethodResponseMock,
  setIsWebWorldReadyMock,
} from '../../../hooks/atoms/useMapAtoms.mock'
import { jest } from '@jest/globals'
import type { MessageFromWebToRN } from '../../../../communication/messages.types'

const createEvent = (
  data: MessageFromWebToRN | { type: 'unknown-type' } | 'not a message',
) =>
  ({
    nativeEvent: {
      data: typeof data === 'string' ? data : JSON.stringify(data),
    },
  }) as any

jest.mock('./../../../hooks/atoms/useMapAtoms', () =>
  require('./../../../hooks/atoms/useMapAtoms.mock'),
)

describe('MapProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Given the component is rendered with children', () => {
    beforeEach(() => {
      render(
        <MapProvider>
          <View>
            <Text testID="child">Hello</Text>
          </View>
        </MapProvider>,
      )
    })

    describe('When nothing', () => {
      test('Then the children are rendered', () => {
        const child = screen.getByTestId('child')
        expect(child).toBeTruthy()
      })

      test('Then the internal WebView is rendered', () => {
        const webView = screen.getByTestId('map-provider-webview')
        expect(webView).toBeTruthy()
      })
    })
  })
})

describe('useWebMessageHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Given the hook is used to get the handler', () => {
    let handler: ReturnType<typeof useWebMessageHandler>['handler']
    beforeEach(() => {
      const { result } = renderHook(() => useWebMessageHandler())
      handler = result.current.handler
    })

    describe('When nothing', () => {
      test('Then the handler is a function', () => {
        expect(typeof handler).toBe('function')
      })
    })

    describe('When handling a message of unknown type', () => {
      test('Then it does not throw', () => {
        expect(() =>
          handler(
            createEvent({
              type: 'unknown-type',
            }),
          ),
        ).not.toThrow()
      })
    })

    describe('When handling something that is not a message', () => {
      test('Then it does not throw', () => {
        expect(() => handler(createEvent('not a message'))).not.toThrow()
      })
    })

    describe('When handling a message of type "console"', () => {
      beforeEach(() => {
        handler(
          createEvent({
            type: 'console',
            payload: {
              level: 'info',
              args: ['hello', 'world'],
            },
          }),
        )
      })

      test('Then logs to the console', () => {
        expect(RNLogger.info).toHaveBeenCalledWith('Web', 'hello', 'world')
      })
    })

    describe('When handling a message of type "ready"', () => {
      beforeEach(() => {
        handler(
          createEvent({
            type: 'ready',
          }),
        )
      })

      test('Then sets the web world is ready', () => {
        expect(setIsWebWorldReadyMock).toHaveBeenCalledWith(true)
      })
    })

    describe('When handling a message of type "webObjectListenerEvent"', () => {
      let rnListener: jest.Mock
      let eventPayload: { x: number }
      beforeEach(() => {
        rnListener = jest.fn()
        eventPayload = { x: Math.random() }
        getWebObjectListenersMock.mockReturnValue({
          click: {
            rnListener,
          },
        })
        handler(
          createEvent({
            type: 'webObjectListenerEvent',
            payload: {
              objectId: 'object-1',
              eventName: 'click',
              event: eventPayload,
            },
          }),
        )
      })

      test('Then dispatches the event to the corresponding listener', () => {
        expect(rnListener).toHaveBeenCalledWith(eventPayload)
      })
    })

    describe('When handling a message of type "mapSourceListenerEvent"', () => {
      let listener: jest.Mock
      let eventPayload: { x: number }
      beforeEach(() => {
        listener = jest.fn()
        eventPayload = { x: Math.random() }
        getMapSourceListenersMock.mockReturnValue({
          click: listener,
        })
        handler(
          createEvent({
            type: 'mapSourceListenerEvent',
            payload: {
              sourceId: 'src-1',
              layerId: 'layer-1',
              eventName: 'click',
              event: eventPayload,
            },
          }),
        )
      })

      test('Then dispatches the event to the corresponding listener', () => {
        expect(listener).toHaveBeenCalledWith(eventPayload)
      })
    })

    describe('When handling a message of type "webObjectMethodResponse"', () => {
      beforeEach(() => {
        handler(
          createEvent({
            type: 'webObjectMethodResponse',
            payload: {
              requestId: 'req-123',
              result: { ok: true },
            },
          }),
        )
      })

      test('Then resolves the web object method response', () => {
        expect(resolveWebObjectPendingMethodResponseMock).toHaveBeenCalledWith({
          requestId: 'req-123',
          result: { ok: true },
        })
      })
    })
  })
})
