import { render, screen, waitFor } from '@testing-library/react-native'
import { jest } from '@jest/globals'
import { setIsWebWorldReady } from '../../hooks/atoms/useMapAtoms.mock'
import {
  mount,
  unmount,
  update,
} from '../hooks/useMountUnmountUpdateCallbacks.mock'
import type {
  MapSourceComponent,
  MapSourceLayer,
} from './createMapSourceAsComponent.types'
import createMapSourceAsComponent from './createMapSourceAsComponent'

jest.mock('./../../hooks/atoms/useMapAtoms', () =>
  require('./../../hooks/atoms/useMapAtoms.mock'),
)

jest.mock('./../hooks/useMountUnmountUpdateCallbacks', () =>
  require('./../hooks/useMountUnmountUpdateCallbacks.mock'),
)

describe('createMapSourceAsComponent', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Given the map source is rendered and the web world is ready', () => {
    let Component: MapSourceComponent<any>

    beforeEach(() => {
      Component = createMapSourceAsComponent()
      setIsWebWorldReady(true)
      render(
        <Component
          id={'src-1'}
          source={{}}
          layers={[]}
        />,
      )
    })

    describe('When nothing', () => {
      beforeEach(() => {})

      test('Then only mount is called', () => {
        waitFor(() => {
          expect(mount).toHaveBeenCalledTimes(1)
          expect(update).toHaveBeenCalledTimes(0)
          expect(unmount).toHaveBeenCalledTimes(0)
        })
      })
    })

    describe('When rerendered with no change', () => {
      beforeEach(() => {
        screen.rerender(
          <Component
            id={'src-1'}
            source={{}}
            layers={[]}
          />,
        )
      })

      test('Then mount and then update is called', () => {
        waitFor(() => {
          expect(mount).toHaveBeenCalledTimes(1)
          expect(update).toHaveBeenCalledTimes(1)
          expect(unmount).toHaveBeenCalledTimes(0)
        })
      })
    })

    describe('When rerendered with new source', () => {
      beforeEach(() => {
        screen.rerender(
          <Component
            id={'src-1'}
            source={{ new: 'new' }}
            layers={[]}
          />,
        )
      })

      test('Then mount and then update is called', () => {
        waitFor(() => {
          expect(mount).toHaveBeenCalledTimes(1)
          expect(update).toHaveBeenCalledTimes(1)
          expect(unmount).toHaveBeenCalledTimes(0)
        })
      })
    })

    describe('When rerendered with new layer', () => {
      beforeEach(() => {
        screen.rerender(
          <Component
            id={'src-1'}
            source={{}}
            layers={[{ layer: { id: 'layer' } } as MapSourceLayer]}
          />,
        )
      })

      test('Then mount and then update is called', () => {
        waitFor(() => {
          expect(mount).toHaveBeenCalledTimes(1)
          expect(update).toHaveBeenCalledTimes(1)
          expect(unmount).toHaveBeenCalledTimes(0)
        })
      })
    })
  })
})
