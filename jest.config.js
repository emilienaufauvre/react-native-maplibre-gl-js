module.exports = {
  preset: 'react-native',
  modulePathIgnorePatterns: [
    '<rootDir>/example/node_modules',
    '<rootDir>/lib/',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testMatch: [
    '**/(*.)+test.unit.ts',
    '**/(*.)+test.unit.tsx',
    '**/(*.)+test.integration.ts',
    '**/(*.)+test.integration.tsx',
  ],
}
