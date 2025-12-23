import { jest } from '@jest/globals'

jest.mock('./src/react-native/hooks/atoms/useMapAtoms', () =>
  require('./src/react-native/hooks/atoms/useMapAtoms.mock'),
)

jest.mock('./src/react-native/logger/rn-logger', () =>
  require('./src/react-native/logger/rn-logger.mock'),
)

jest.mock('react-native-webview', () => {
  const React = require('react')
  const { View } = require('react-native')
  const WebView = React.forwardRef((props: any, ref: any) => {
    return React.createElement(View, { ...props, ref })
  })

  return { WebView }
})
