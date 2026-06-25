import { useCallback, useMemo } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { router } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import MaterialCommunityIcons from '@react-native-vector-icons/material-icons'

/**
 * @returns - A home page that links to all example screens.
 */
const Index = () => {
  const insets = useSafeAreaInsets()
  // List the example routes.
  const sections = useMemo(() => groupByFolder(routes), [])
  // Go to the selected example route.
  const handlePress = useCallback((path: string) => {
    router.push(path as never)
  }, [])

  //TODO remove
  //return <Redirect href={'/1.-Map/1.7.-Add'} />
  /////////////
  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        {
          paddingTop: insets.top + 32,
          paddingBottom: insets.bottom,
        },
      ]}
    >
      <Text style={styles.title}>{'Examples'}</Text>
      {Object.entries(sections).map(([folder, screens]) => (
        <View
          key={folder}
          style={styles.section}
        >
          <Text style={styles.sectionTitle}>{folder}</Text>
          {screens.map((screen) => {
            return (
              <Pressable
                key={screen.path}
                style={styles.item}
                onPress={() => handlePress(screen.path)}
              >
                <View style={styles.itemTextWrapper}>
                  <Text style={styles.itemIndex}>{screen.index}</Text>
                  <Text style={styles.itemTitle}>{screen.title}</Text>
                </View>
                <MaterialCommunityIcons
                  name={'chevron-right'}
                  size={28}
                />
              </Pressable>
            )
          })}
        </View>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
  },
  title: {
    marginBottom: 12,
    fontSize: 28,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 28,
  },
  sectionTitle: {
    marginBottom: 12,
    fontSize: 20,
    fontWeight: 'bold',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingVertical: 8,
    paddingLeft: 12,
    paddingRight: 4,
    borderRadius: 8,
    backgroundColor: '#E5E5E5',
  },
  itemTextWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  itemIndex: {
    fontSize: 14,
  },
  itemTitle: {
    fontSize: 16,
    flex: 1,
  },
  emptyState: {
    marginTop: 8,
    fontSize: 14,
    color: '#555',
  },
})

type RouteDef = {
  path: string
}

type RouteWithMeta = {
  folder: string
  index: string
  title: string
  path: string
}

const routes: RouteDef[] = [
  { path: '/1.-Map/1.1.-Component-basics' },
  { path: '/1.-Map/1.2.-Create-a-camera-animation' },
  { path: '/1.-Map/1.3.-Use-the-globe-projection' },
  { path: '/1.-Map/1.4.-Add-a-raster-tile-source-directly-on-map' },
  { path: '/1.-Map/1.5.-Use-global-css-styles' },
  { path: '/1.-Map/1.6.-Add-more-velocity-to-drag-pan' },
  { path: '/1.-Map/1.7.-Use-a-native-script-to-enhance-performances' },
  { path: '/1.-Map/1.8.-Use-functions-in-map-options' },
  { path: '/2.-Marker/2.1.-Component-basics' },
  { path: '/2.-Marker/2.2.-Animate-the-coordinate-with-reanimated' },
  { path: '/2.-Marker/2.3.-Animate-on-click-with-css' },
  { path: '/2.-Marker/2.4.-Use-an-detached-popup' },
  { path: '/2.-Marker/2.5.-Use-an-attached-popup' },
  { path: '/2.-Marker/2.6.-Propagates-the-events-to-a-parent-component' },
  { path: '/2.-Marker/2.7.-Use-a-local-image' },
  { path: '/2.-Marker/2.8.-Listeners-on-inner-html-element' },
  { path: '/3.-Popup/3.1.-Component-basics' },
  { path: '/3.-Popup/3.2.-Use-html-element' },
  { path: '/4.-GeoJSONSource/4.1.-Component-basics' },
  { path: '/4.-GeoJSONSource/4.2.-Use-a-line-gradient' },
  { path: '/4.-GeoJSONSource/4.3.-Use-a-local-image' },
  { path: '/5.-ImageSource/5.1.-Component-basics' },
  { path: '/5.-ImageSource/5.2.-Use-an-interactive-listener' },
  { path: '/5.-ImageSource/5.3.-Animate-a-serie-of-images-1' },
  { path: '/5.-ImageSource/5.4.-Animate-a-serie-of-images-2' },
  { path: '/6.-VideoSource/6.1.-Component-basics' },
  { path: '/7.-VectorTileSource/7.1.-Component-basics' },
  { path: '/8.-RasterTileSource/8.1.-Component-basics' },
]

const toWords = (value: string): string =>
  value
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/-/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const parseRoutePath = (path: string): RouteWithMeta => {
  const [, folderSegment = '', screenSegment = ''] = path.split('/')
  const folder = toWords(folderSegment.replace(/^\d+\.-/, ''))

  const match = screenSegment.match(/^(\d+(?:\.\d+)?)\.-(.+)$/)
  const index = match?.[1] ?? screenSegment
  const title = toWords(match?.[2] ?? screenSegment)

  return {
    folder,
    index,
    title,
    path,
  }
}

const groupByFolder = (items: RouteDef[]): Record<string, RouteWithMeta[]> => {
  return items.reduce<Record<string, RouteWithMeta[]>>((acc, route) => {
    const parsedRoute = parseRoutePath(route.path)

    if (!acc[parsedRoute.folder]) {
      acc[parsedRoute.folder] = []
    }

    acc[parsedRoute.folder]?.push(parsedRoute)
    return acc
  }, {})
}

export default Index
