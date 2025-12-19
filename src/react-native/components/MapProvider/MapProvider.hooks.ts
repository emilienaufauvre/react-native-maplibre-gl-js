import { StyleSheet } from 'react-native'
import { useMemo } from 'react'

export const useStyles = () => {
  return useMemo(
    () =>
      StyleSheet.create({
        container: { width: '100%', height: '100%', overflow: 'hidden' },
        webView: { flex: 1, backgroundColor: 'transparent' },
      }),
    [],
  )
}
