import getConfig from 'next/config';

interface ServerRuntimeConfig {
  githubToken: string;
  githubUrl: string;
}

/**
 * Helper with definitely typed next/config serverRuntimeConfig
 */
export const getServerEnvironmentConfig = (): ServerRuntimeConfig => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- we disable "any" check as this is the Next.js type which we are going to narrow down
  const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

  return { ...serverRuntimeConfig, ...publicRuntimeConfig } as ServerRuntimeConfig;
};
