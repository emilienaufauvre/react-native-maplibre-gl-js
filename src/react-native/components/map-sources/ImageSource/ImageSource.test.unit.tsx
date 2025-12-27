import { render } from '@testing-library/react-native'
import ImageSource from './ImageSource'

describe('ImageSource', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Given the component is rendered', () => {
    beforeEach(() => {
      render(
        <ImageSource
          id={'src-1'}
          source={{
            type: 'image',
            url: '',
            coordinates: [
              [0, 0],
              [1, 1],
              [2, 2],
              [3, 3],
            ],
          }}
          layers={[]}
        />,
      )
    })

    describe('When nothing', () => {
      test('Then it does not crash', () => {})
    })
  })
})
