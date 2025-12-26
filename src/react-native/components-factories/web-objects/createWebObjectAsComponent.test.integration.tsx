import { render, screen, waitFor } from '@testing-library/react-native'
import createWebObjectAsComponent from './createWebObjectAsComponent'
import { jest } from '@jest/globals'
import type {
  WebObjectComponent,
  WebObjectRef,
  WebObjectProps,
} from './createWebObjectAsComponent.types'
import { setIsWebWorldReady } from '../../hooks/atoms/useMapAtoms.mock'
import {
  mount,
  unmount,
  update,
} from '../hooks/useMountUnmountUpdateCallbacks.mock'

jest.mock('./../../hooks/atoms/useMapAtoms', () =>
  require('./../../hooks/atoms/useMapAtoms.mock'),
)

jest.mock('./../hooks/useMountUnmountUpdateCallbacks', () =>
  require('./../hooks/useMountUnmountUpdateCallbacks.mock'),
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

      test('Then only mount is called', async () => {
        await waitFor(() => {
          expect(mount).toHaveBeenCalledTimes(1)
          expect(update).toHaveBeenCalledTimes(0)
          expect(unmount).toHaveBeenCalledTimes(0)
        })
      })
    })

    describe('When rerendered with no change', () => {
      beforeEach(() => {
        screen.rerender(<Component />)
      })

      test('Then mount and then update is called', async () => {
        await waitFor(() => {
          expect(mount).toHaveBeenCalledTimes(1)
          expect(update).toHaveBeenCalledTimes(1)
          expect(unmount).toHaveBeenCalledTimes(0)
        })
      })
    })

    describe('When rerendered with new listeners', () => {
      beforeEach(() => {
        screen.rerender(<Component listeners={{ new: () => {} }} />)
      })

      test('Then mount and then update is called', async () => {
        await waitFor(() => {
          expect(mount).toHaveBeenCalledTimes(1)
          expect(update).toHaveBeenCalledTimes(1)
          expect(unmount).toHaveBeenCalledTimes(0)
        })
      })
    })

    describe('When rerendered with new options', () => {
      beforeEach(() => {
        screen.rerender(<Component options={{ new: true }} />)
      })

      test('Then mount and then update is called', async () => {
        await waitFor(() => {
          expect(mount).toHaveBeenCalledTimes(1)
          expect(update).toHaveBeenCalledTimes(1)
          expect(unmount).toHaveBeenCalledTimes(0)
        })
      })
    })
  })
})
