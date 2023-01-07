const { GITHUB_GRAPHQL_TOKEN, GITHUB_GRAPHQL_URL } = require('./bin/environmentVariables');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  /**
   * @type {import('domains/shared/helpers/getEnvConfig').ServerEnvConfig}
   */
  serverRuntimeConfig: {
    githubToken: GITHUB_GRAPHQL_TOKEN,
    githubUrl: GITHUB_GRAPHQL_URL,
  },
};

module.exports = nextConfig;
