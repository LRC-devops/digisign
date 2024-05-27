/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/src/$1",
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  globals: {
    usESM: true
  },
  setupFilesAfterEnv: ["./jest.setup.js"]
};
