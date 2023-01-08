import type { ServerRuntimeConfig } from '../getServerEnvironmentConfig';

export const getServerEnvironmentConfig = (): ServerRuntimeConfig => {
  return { githubToken: 'MOCKED_GITHUB_TOKEN', githubUrl: 'MOCKED_GITHUB_URL' };
};
