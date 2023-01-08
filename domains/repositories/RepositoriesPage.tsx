import { RepositoriesList } from '@domains/repositories/components/List/RepositoriesList';
import { RepositoriesListSkeleton } from '@domains/repositories/components/List/RepositoriesListSkeleton';
import { NoResults } from '@domains/repositories/components/NoResults/NoResults';
import { Pagination } from '@domains/repositories/components/Pagination/Pagination';
import { SearchForm } from '@domains/repositories/components/SearchForm/SearchForm';
import { createTitle, Head } from '@domains/shared/components/Head/Head';
import { PageContent } from '@domains/shared/components/PageContent/PageContent';
import type { GetRepositoriesQuery } from '@graphql/graphql';
import { useRouter } from 'next/router';
import type { FC } from 'react';
import { useCallback, useEffect, useState } from 'react';

import { StyledHeading, StyledSearchContainer } from './RepositoriesPage.theme';

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
  const [isRouteChangeInProgress, setIsRouteChangeInProgress] = useState(false);
  const { query } = useRouter();
  const { nodes, repositoryCount } = searchResults;
  const { current, last } = pagination;

  useEffect(() => {
    // Reset state on route change
    setIsRouteChangeInProgress(false);
  }, [query.searchTerm, query.page]);

  const handleSuccessfulSearchSubmit = useCallback(() => {
    setIsRouteChangeInProgress(true);
  }, []);

  return (
    <>
      <Head title={createTitle(searchTerm)} />

      <StyledSearchContainer maxWidth="md">
        <SearchForm defaultSearchTerm={searchTerm} onSubmitSuccess={handleSuccessfulSearchSubmit} />
      </StyledSearchContainer>

      <PageContent>
        {repositoryCount ? (
          <>
            <StyledHeading variant="h2">Showing {repositoryCount} available repository results</StyledHeading>
            {isRouteChangeInProgress ? (
              <RepositoriesListSkeleton length={nodes?.length ?? 1} />
            ) : (
              <RepositoriesList nodes={nodes} />
            )}
            {last > 1 ? (
              <Pagination
                count={last}
                defaultPage={current}
                onChange={handleSuccessfulSearchSubmit}
                searchTerm={searchTerm}
              />
            ) : null}
          </>
        ) : (
          <NoResults searchTerm={searchTerm} />
        )}
      </PageContent>
    </>
  );
};

export default RepositoriesPage;
