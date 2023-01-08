import { githubGraphQlClient } from '@domains/shared/ssr/githubGraphQlClient';
import type { GetRepositoriesQuery } from '@graphql/graphql';
import type { PromisifiedSource } from '@urql/core';
import { CombinedError } from '@urql/core';
import type { ExecutionResult } from 'graphql-ws/lib/common';

import { getStaticProps } from '../repositoriesPageServer';

jest.mock('@domains/shared/ssr/getServerEnvironmentConfig');
jest.mock('@domains/shared/ssr/githubGraphQlClient', () => ({
  githubGraphQlClient: {
    query: jest.fn(),
  },
}));

const mockUrqlReturnData = (returnValue: ExecutionResult | { error: CombinedError }) =>
  ({
    toPromise: () => Promise.resolve(returnValue),
  } as PromisifiedSource);

describe('getStaticProps()', () => {
  const mockedSearchNode = {
    __typename: 'Repository',
    id: '1',
    forkCount: 10_111,
    name: 'Test name',
    stargazerCount: 10_200,
    url: '/test-name',
  } as const;
  const mockedSearchResults: GetRepositoriesQuery['search'] = {
    nodes: [
      { ...mockedSearchNode, id: '1' },
      { ...mockedSearchNode, id: '2' },
    ],
    repositoryCount: 100,
  };

  it('returns redirect to the last possible page when the provided page is out of boundaries', async () => {
    jest
      .mocked(githubGraphQlClient.query)
      .mockReturnValue(mockUrqlReturnData({ data: { search: { ...mockedSearchResults, repositoryCount: 100 } } }));

    const returnValue = await getStaticProps({
      params: { searchTerm: 'searchTerm', page: '999' },
    });
    expect(returnValue).toEqual({ redirect: { destination: '/searchterm/5', permanent: false } });
  });

  it('returns redirect to the main result page when the GraphQL returns 0 results and there is an expected page to view', async () => {
    jest
      .mocked(githubGraphQlClient.query)
      .mockReturnValue(mockUrqlReturnData({ data: { search: { nodes: [], repositoryCount: 0 } } }));

    const returnValue = await getStaticProps({
      params: { searchTerm: 'searchTerm', page: '999' },
    });
    expect(returnValue).toEqual({ redirect: { destination: '/searchterm', permanent: false } });
  });

  it('does not return redirect to the main result page when the GraphQL returns 0 results and there is no expected "page" to view', async () => {
    jest
      .mocked(githubGraphQlClient.query)
      .mockReturnValue(mockUrqlReturnData({ data: { search: { nodes: [], repositoryCount: 0 } } }));

    const returnValue = await getStaticProps({
      params: { searchTerm: 'searchTerm' },
    });
    expect(returnValue).toEqual({
      props: {
        pagination: { current: 1, last: 0, offset: 0, perPage: 20 },
        searchResults: { nodes: [], repositoryCount: 0 },
        searchTerm: 'searchTerm',
      },
      revalidate: 60,
    });
  });

  it('calls GraphQL with the valid cursor', async () => {
    await getStaticProps({
      params: { searchTerm: 'searchTerm', page: '10' },
    });

    expect(githubGraphQlClient.query).toHaveBeenCalledTimes(1);
    expect(githubGraphQlClient.query).toHaveBeenCalledWith(expect.any(Object), {
      after: 'Y3Vyc29yOjE4MA==', // Encoded to base64 "cursor:10"
      first: 20,
      query: 'searchTerm',
    });
  });

  it('returns not found page when the search term input is invalid', async () => {
    const returnValue = await getStaticProps({
      params: { searchTerm: '' },
    });

    expect(returnValue).toEqual({ notFound: true });
  });

  it('returns data when pre-validation was successful and GraphQL returned any data', async () => {
    jest
      .mocked(githubGraphQlClient.query)
      .mockReturnValue(mockUrqlReturnData({ data: { search: mockedSearchResults } }));

    const returnValue = await getStaticProps({
      params: { searchTerm: 'searchTerm' },
    });
    expect(returnValue).toEqual({
      props: {
        pagination: { current: 1, last: 5, offset: 0, perPage: 20 },
        searchResults: {
          nodes: [
            {
              __typename: 'Repository',
              forkCount: 10_111,
              id: '1',
              name: 'Test name',
              stargazerCount: 10_200,
              url: '/test-name',
            },
            {
              __typename: 'Repository',
              forkCount: 10_111,
              id: '2',
              name: 'Test name',
              stargazerCount: 10_200,
              url: '/test-name',
            },
          ],
          repositoryCount: 100,
        },
        searchTerm: 'searchTerm',
      },
      revalidate: 60,
    });
  });

  it('throws an error when GraphQL returns error', async () => {
    jest
      .mocked(githubGraphQlClient.query)
      .mockReturnValue(mockUrqlReturnData({ error: new CombinedError({ networkError: new Error('Test Error') }) }));

    await expect(
      getStaticProps({
        params: { searchTerm: 'searchTerm' },
      }),
    ).rejects.toThrow('Network error occurred: Test Error');
  });
});
