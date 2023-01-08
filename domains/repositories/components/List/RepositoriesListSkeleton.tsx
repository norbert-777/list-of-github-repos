import type { FC } from 'react';

import { StyledUl } from './RepositoriesList.theme';
import { StyledSkeleton } from './RepositoriesListSkeleton.theme';

export const RepositoriesListSkeleton: FC<{ length: number }> = ({ length }) => {
  return (
    <StyledUl data-testid="repositories-skeleton">
      {Array.from({ length }).map((_, index) => (
        <li key={index}>
          <StyledSkeleton variant="rounded" />
        </li>
      ))}
    </StyledUl>
  );
};
