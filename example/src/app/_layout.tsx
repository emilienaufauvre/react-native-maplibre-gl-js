import { Stack } from 'expo-router'

// eslint-disable-next-line jsdoc/require-jsdoc
const Layout = () => {
  return (
    <Stack
      screenOptions={{
        headerBackButtonDisplayMode: 'minimal',
        headerTransparent: true,
        headerTitle: '',
      }}
    />
  )
}

export default Layout
