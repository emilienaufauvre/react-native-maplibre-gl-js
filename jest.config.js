module.exports = {
  preset: 'react-native',
  modulePathIgnorePatterns: [
    '<rootDir>/example/node_modules',
    '<rootDir>/lib/',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
}
