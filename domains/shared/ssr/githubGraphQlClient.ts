import { getServerEnvironmentConfig } from '@domains/shared/ssr/getServerEnvironmentConfig';
import { createClient, fetchExchange } from '@urql/core';

const { githubToken, githubUrl } = getServerEnvironmentConfig();

const QUERY_TIMEOUT_IN_MS = 10_000;

const fetchWithTimout: typeof fetch = (input, init) =>
  fetch(input, { ...init, signal: AbortSignal.timeout(QUERY_TIMEOUT_IN_MS) });

export const githubGraphQlClient = createClient({
  url: githubUrl,
  fetch: fetchWithTimout,
  fetchOptions: () => {
    return {
      headers: { authorization: `Bearer ${githubToken}` },
    };
  },
  exchanges: [fetchExchange],
});
