export default {
  coveragePathIgnorePatterns: ['/node_modules/', '/__fixtures__/'],
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['/node_modules/', '/__fixtures__/'],
  transform: {
    '^.+\\.jsx?$': 'esbuild-jest',
  },
};
