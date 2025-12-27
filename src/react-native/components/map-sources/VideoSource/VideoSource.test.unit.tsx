import { render } from '@testing-library/react-native'
import VideoSource from './VideoSource'

describe('VideoSource', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Given the component is rendered', () => {
    beforeEach(() => {
      render(
        <VideoSource
          id={'src-1'}
          source={{
            type: 'video',
            urls: [],
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
