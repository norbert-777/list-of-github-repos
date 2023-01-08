import type { GetRepositoriesQuery } from '@graphql/graphql';
import type { FC } from 'react';
import { memo } from 'react';

import { StyledUl } from './RepositoriesList.theme';
import { RepositoriesListItem } from './RepositoriesListItem';

export const RepositoriesListBase: FC<{ nodes: GetRepositoriesQuery['search']['nodes'] }> = ({ nodes }) => {
  if (!nodes) {
    return null;
  }

  return (
    <StyledUl data-testid="repositories">
      {nodes?.map((node) => {
        // GitHub GraphQL returns multiple results type, filter-out unsupported
        if (!node || node.__typename !== 'Repository') {
          return null;
        }

        return <RepositoriesListItem key={node.id} {...node} />;
      })}
    </StyledUl>
  );
};

export const RepositoriesList = memo(RepositoriesListBase);
