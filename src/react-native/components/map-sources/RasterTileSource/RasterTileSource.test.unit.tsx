import { render } from '@testing-library/react-native'
import RasterTileSource from './RasterTileSource'

describe('RasterTileSource', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Given the component is rendered', () => {
    beforeEach(() => {
      render(
        <RasterTileSource
          id={'src-1'}
          source={{ type: 'raster' }}
          layers={[]}
        />,
      )
    })

    describe('When nothing', () => {
      test('Then it does not crash', () => {})
    })
  })
})
