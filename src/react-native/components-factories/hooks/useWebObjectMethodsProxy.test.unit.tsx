import { forwardRef, createRef } from 'react'
import { render, screen, act } from '@testing-library/react-native'
import { jest } from '@jest/globals'
import useWebObjectMethodsProxy from './useWebObjectMethodsProxy'
import {
  dispatchMessageMock,
  setWebObjectPendingMethodResponseMock,
} from '../../hooks/atoms/useMapAtoms.mock'
import type { WebObjectId } from '../web-objects/createWebObjectAsComponent.types'

jest.mock('./../../hooks/atoms/useMapAtoms', () =>
  require('./../../hooks/atoms/useMapAtoms.mock'),
)

describe('useWebObjectMethodsProxy', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.restoreAllMocks()
  })

  describe('Given a Probe using useWebObjectMethodsProxy is rendered', () => {
    const initialObjectId = 'obj-1'

    /**
     * Probe that uses useWebObjectMethodsProxy.
     */
    const Probe = forwardRef<any, { objectId: WebObjectId }>(
      ({ objectId }, ref) => {
        useWebObjectMethodsProxy(ref, objectId)
        return null
      },
    )

    const ref = createRef<any>()

    beforeEach(() => {
      render(
        <Probe
          ref={ref}
          objectId={initialObjectId}
        />,
      )
    })

    describe('When getId is called', () => {
      let result: any

      beforeEach(() => {
        result = ref.current.getId()
      })

      test('Then it returns the objectId and no message is sent', () => {
        expect(result).toBe(initialObjectId)
        expect(setWebObjectPendingMethodResponseMock).toHaveBeenCalledTimes(0)
        expect(dispatchMessageMock).toHaveBeenCalledTimes(0)
      })
    })

    describe('When a method is called on the proxy', () => {
      beforeEach(() => {
        act(() => {
          ref.current.flyTo(1, 'a', { foo: 'bar' })
        })
      })

      test('Then a pending response is set and a webObjectMethodCall message is sent', () => {
        expect(setWebObjectPendingMethodResponseMock).toHaveBeenCalledTimes(1)
        expect(dispatchMessageMock).toHaveBeenCalledTimes(1)
      })
    })

    describe('When a method is called on the proxy and the stored resolver is called', () => {
      let promise: Promise<any>
      const resolveValue = 'ok'

      beforeEach(() => {
        act(() => {
          promise = ref.current.flyTo(1, 'a', { foo: 'bar' })
        })
        const [{ resolve }] =
          setWebObjectPendingMethodResponseMock.mock.calls[0]
        act(() => {
          resolve(resolveValue)
        })
      })

      test('Then the method promise resolves with the given value', async () => {
        await expect(promise).resolves.toBe(resolveValue)
      })
    })

    describe('When rerendered with the same objectId', () => {
      let firstProxyRef: any

      beforeEach(() => {
        firstProxyRef = ref.current
        screen.rerender(
          <Probe
            ref={ref}
            objectId={initialObjectId}
          />,
        )
      })

      test('Then the ref still points to the same proxy instance', () => {
        expect(ref.current).toBe(firstProxyRef)
        expect(ref.current.getId()).toBe(initialObjectId)
      })
    })

    describe('When rerendered with a different objectId', () => {
      const newObjectId = 'obj-2'
      let firstProxyRef: any

      beforeEach(() => {
        firstProxyRef = ref.current
        screen.rerender(
          <Probe
            ref={ref}
            objectId={newObjectId}
          />,
        )
      })

      test('Then the ref points to a new proxy instance reflecting the new objectId', () => {
        expect(ref.current).not.toBe(firstProxyRef)
        expect(ref.current.getId()).toBe(newObjectId)
      })
    })
  })
})
