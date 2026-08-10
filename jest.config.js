module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  setupFiles: ['<rootDir>/src/test/setup.ts'],
  roots: ['<rootDir>/src/test'],
  testMatch: ['**/*.spec.ts'],
};