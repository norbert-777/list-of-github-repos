import { Head } from '@domains/shared/components/Head/Head';
import type { GetRepositoriesQuery } from '@graphql/graphql';
import type { FC } from 'react';

export interface RepositoriesPageProperties {
  searchTerm: string;
  searchResults: GetRepositoriesQuery['search'];
  pagination: {
    current: number;
    last: number;
    offset: number;
    perPage: number;
  };
}

const RepositoriesPage: FC<RepositoriesPageProperties> = ({ pagination, searchTerm, searchResults }) => {
  const { repositoryCount } = searchResults;

  return (
    <>
      <Head />

      {repositoryCount ? (
        <>
          <h2>Showing {repositoryCount} available repository results</h2>
          <main>The main page</main>
          {JSON.stringify(pagination)}
        </>
      ) : (
        <main>We couldn&apos;t find any repositories matching &apos;{searchTerm}&apos; term</main>
      )}
    </>
  );
};

export default RepositoriesPage;
