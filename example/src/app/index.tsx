import { useCallback, useMemo } from 'react'
import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native'
import { router } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

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
  //return <Redirect href={'/Components/2.5.MarkerPropagatesEvents'} />
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
          {screens.map((screen) => (
            <Pressable
              key={screen.path}
              style={styles.item}
              onPress={() => handlePress(screen.path)}
            >
              <Text style={styles.itemText}>{screen.name}</Text>
              <MaterialCommunityIcons
                name={'chevron-right'}
                size={28}
              />
            </Pressable>
          ))}
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
  itemText: {
    fontSize: 16,
  },
})

type RouteDef = {
  folder: string
  name: string
  path: string
}

// @ts-ignore
const ctx = require.context('./', true, /\.tsx?$/)

const pretty = (value: string): string => {
  return (
    value
      // Remove .tsx/ts.
      .replace(/[-_]/g, ' ')
      // Add space after numbers at the start: 1.SomeName → 1. SomeName.
      .replace(/^(\d+)\s*\./, '$1. ')
      // Separate camelCase: someName → some Name.
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      // Capitalize the first letter of each word.
      .replace(/\b\w/g, (c) => c.toUpperCase())
      .trim()
  )
}

// List all the routes/examples available.
const routes: RouteDef[] = ctx
  .keys()
  .filter((key: string) => !(key.includes('_layout') || key === './index.tsx'))
  .map((key: string) => {
    const clean = key.replace('./', '').replace('.tsx', '')
    const parts: string[] = clean.split('/')
    const folder: string = parts.at(0) ?? 'General'
    const name: string =
      parts.length > 1 ? parts.slice(1).join('/') : (parts[0] ?? '')
    return {
      folder: pretty(folder),
      name: pretty(name),
      path: `/${clean}`,
    }
  })
  .sort(
    (a: RouteDef, b: RouteDef) =>
      a.folder.localeCompare(b.folder) || a.name.localeCompare(b.name),
  )

const groupByFolder = (items: RouteDef[]): Record<string, RouteDef[]> =>
  items.reduce<Record<string, RouteDef[]>>(
    (acc: Record<string, RouteDef[]>, route: RouteDef) => {
      if (!acc[route.folder]) {
        acc[route.folder] = []
      }
      acc?.[route.folder]?.push(route)
      return acc
    },
    {},
  )

export default Index
