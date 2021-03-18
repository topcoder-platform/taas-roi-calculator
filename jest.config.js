module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
  ],
  coverageDirectory: '__coverage__',
  moduleNameMapper: {
    '\\.(scss|css)$': 'identity-obj-proxy',
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)$": "<rootDir>/__mocks__/fileMock.js",
  },
  rootDir: '.',
  testMatch: ['**/__tests__/**/*.js?(x)'],
  testPathIgnorePatterns: [
    '/node_modules/',
  ],
  testURL: 'http://localhost',
  transformIgnorePatterns: [
    '/node_modules/(?!topcoder-react-utils)',
  ],
  transform: {
    "^.+\\.(j|t)sx?$": "babel-jest",
  },
  setupTestFrameworkScriptFile: '<rootDir>/config/jest/setup.js',
};