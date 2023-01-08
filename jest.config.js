const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

const customJestConfig = {
  clearMocks: true, // Automatically clear mock calls and instances between every test
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    // Handle module aliases
    '^@domains/(.*)$': '<rootDir>/domains/$1',
    '^@graphql/(.*)$': '<rootDir>/generated/graphql/$1',
    '^@pages/(.*)$': '<rootDir>/pages/$1',
    '^@styles/(.*)$': '<rootDir>/styles/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
