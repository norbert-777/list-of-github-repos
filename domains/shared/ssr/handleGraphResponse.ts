import type { OperationResult } from '@urql/core/dist/types/types';

/**
 * Decorator - Simplified version of GraphQL response/errors handling.
 */
export const handleGraphResponse = <Data>(response: Pick<OperationResult<Data>, 'data' | 'error'>): Data => {
  const { data, error } = response;

  if (error?.networkError) {
    throw new Error(`Network error occurred: ${error.networkError.message}`);
  }
  if (error?.graphQLErrors.length) {
    console.error('GraphQL responded with errors', error.graphQLErrors);
  }

  if (!data) {
    throw new Error('Fatal error, GraphQL returned the empty data');
  }

  return data;
};
