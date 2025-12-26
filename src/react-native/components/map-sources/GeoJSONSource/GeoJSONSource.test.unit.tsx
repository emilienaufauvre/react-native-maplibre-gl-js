import { render } from '@testing-library/react-native'
import GeoJSONSource from './GeoJSONSource'

describe('GeoJSONSource', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Given the component is rendered', () => {
    beforeEach(() => {
      render(
        <GeoJSONSource
          id={'src-1'}
          source={{ type: 'geojson', data: '' }}
          layers={[]}
        />,
      )
    })

    describe('When nothing', () => {
      test('Then it does not crash', () => {})
    })
  })
})
