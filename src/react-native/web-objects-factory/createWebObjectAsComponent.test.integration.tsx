import { render, screen } from '@testing-library/react-native'
import createWebObjectAsComponent from './createWebObjectAsComponent'
import { jest } from '@jest/globals'
import type {
  WebObjectComponent,
  WebObjectRef,
  WebObjectProps,
} from './createWebObjectAsComponent.types'
import { mount, unmount } from './hooks/useWebObjectMountUnmountCallbacks.mock'
import { setIsWebWorldReady } from '../hooks/atoms/useMapAtoms.mock'

jest.mock('./../hooks/atoms/useMapAtoms', () =>
  require('./../hooks/atoms/useMapAtoms.mock'),
)

jest.mock('./hooks/useWebObjectMountUnmountCallbacks', () =>
  require('./hooks/useWebObjectMountUnmountCallbacks.mock'),
)

describe('createWebObjectAsComponent', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Given the web object is rendered and the web world is ready', () => {
    let Component: WebObjectComponent<
      WebObjectRef<any>,
      WebObjectProps<any, any>
    >

    beforeEach(() => {
      Component = createWebObjectAsComponent('map')
      setIsWebWorldReady(true)
      render(<Component />)
    })

    describe('When nothing', () => {
      beforeEach(() => {})

      test('Then everything have been mounted', () => {
        expect(mount).toHaveBeenCalledTimes(1)
        expect(mount).toHaveBeenCalledWith({ options: true, listeners: true })
      })
    })

    describe('When rerendered with no change', () => {
      beforeEach(() => {
        screen.rerender(<Component />)
      })

      test('Then nothing is re-mounted', () => {
        expect(unmount).toHaveBeenCalledTimes(1)
        expect(mount).toHaveBeenCalledTimes(1)
      })
    })

    describe('When rerendered with new listeners', () => {
      beforeEach(() => {
        screen.rerender(<Component listeners={{ new: () => {} }} />)
      })

      test('Then only the listeners have been re-mounted', () => {
        expect(unmount).toHaveBeenCalledTimes(2)
        expect(mount).toHaveBeenCalledTimes(2)
        expect(unmount).toHaveBeenNthCalledWith(2, {
          options: false,
          listeners: true,
        })
        expect(mount).toHaveBeenNthCalledWith(2, {
          options: false,
          listeners: true,
        })
      })
    })

    describe('When rerendered with new options', () => {
      beforeEach(() => {
        screen.rerender(<Component options={{ new: true }} />)
      })

      test('Then everything have been re-mounted', () => {
        expect(unmount).toHaveBeenCalledTimes(2)
        expect(mount).toHaveBeenCalledTimes(2)
        expect(unmount).toHaveBeenNthCalledWith(2, {
          options: true,
          listeners: true,
        })
        expect(mount).toHaveBeenNthCalledWith(2, {
          options: true,
          listeners: true,
        })
      })
    })
  })
})
