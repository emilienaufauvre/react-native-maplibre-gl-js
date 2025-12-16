export default {
  overrides: [
    {
      exclude: /\/node_modules\//,
      presets: ['module:react-native-builder-bob/babel-preset'],
    },
    {
      include: /\/node_modules\//,
      presets: ['module:@react-native/babel-preset'],
    },
    {
      presets: ['module:@react-native/babel-preset'],
      plugins: [
        [
          'module-resolver',
          {
            alias: { '@ml': './src' },
            extensions: ['.ts', '.tsx', '.js', '.jsx'],
          },
        ],
      ],
    },
  ],
}
