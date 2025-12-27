import { render } from '@testing-library/react-native'
import VectorTileSource from './VectorTileSource'

describe('VectorTileSource', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Given the component is rendered', () => {
    beforeEach(() => {
      render(
        <VectorTileSource
          id={'src-1'}
          source={{ type: 'vector' }}
          layers={[]}
        />,
      )
    })

    describe('When nothing', () => {
      test('Then it does not crash', () => {})
    })
  })
})
