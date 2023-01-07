import { graphql } from '@graphql/gql';

export const SEARCH_QUERY = graphql(`
  query GetRepositories($query: String!, $after: String, $first: Int) {
    search(query: $query, after: $after, first: $first, type: REPOSITORY) {
      nodes {
        ... on Repository {
          forkCount
          id
          name
          stargazerCount
          url
        }
      }
      repositoryCount
    }
  }
`);
