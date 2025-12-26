import { render, screen, waitFor } from '@testing-library/react-native'
import { jest } from '@jest/globals'
import useMountUpdateUnmountWhenNeeded from './useMountUpdateUnmountWhenNeeded'
import { mount, unmount, update } from './useMountUnmountUpdateCallbacks.mock'
import { setIsWebWorldReady } from '../../hooks/atoms/useMapAtoms.mock'

jest.mock('./useMountUnmountUpdateCallbacks', () =>
  require('./useMountUnmountUpdateCallbacks.mock'),
)

jest.mock('./../../hooks/atoms/useMapAtoms', () =>
  require('./../../hooks/atoms/useMapAtoms.mock'),
)

describe('useMountUpdateUnmountWhenNeeded', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  /**
   * Probe that uses useMountUpdateUnmountWhenNeeded.
   */
  const Probe = () => {
    useMountUpdateUnmountWhenNeeded({
      type: 'webObject',
      props: {
        options: { foo: 'bar' },
        listeners: { onTap: 'tapFunction' },
      },
      objectId: 'obj-1',
      objectType: 'map',
    })
    return null
  }

  describe('Given a Probe using useMountUpdateUnmountWhenNeeded is rendered and the web world is not ready', () => {
    beforeEach(() => {
      setIsWebWorldReady(false)
      render(<Probe />)
    })

    describe('When nothing', () => {
      test('Then nothing is called', async () => {
        await waitFor(() => {
          expect(mount).toHaveBeenCalledTimes(0)
          expect(update).toHaveBeenCalledTimes(0)
          expect(unmount).toHaveBeenCalledTimes(0)
        })
      })
    })

    describe('When the web world becomes ready and the probe is rerendered', () => {
      beforeEach(() => {
        setIsWebWorldReady(true)
        screen.rerender(<Probe />)
      })

      test('Then only mount is called', async () => {
        await waitFor(() => {
          expect(mount).toHaveBeenCalledTimes(1)
          expect(update).toHaveBeenCalledTimes(0)
          expect(unmount).toHaveBeenCalledTimes(0)
        })
      })
    })
  })

  describe('Given a Probe using useMountUpdateUnmountWhenNeeded is rendered and the web world is ready', () => {
    beforeEach(() => {
      setIsWebWorldReady(true)
      render(<Probe />)
    })

    describe('When nothing', () => {
      test('Then only mount is called', async () => {
        await waitFor(() => {
          expect(mount).toHaveBeenCalledTimes(1)
          expect(update).toHaveBeenCalledTimes(0)
          expect(unmount).toHaveBeenCalledTimes(0)
        })
      })
    })

    describe('When rerendered', () => {
      beforeEach(() => {
        screen.rerender(<Probe />)
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
