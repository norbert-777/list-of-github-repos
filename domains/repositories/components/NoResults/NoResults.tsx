import type { FC } from 'react';

import { StyledTypography } from './NoResults.theme';

export const NoResults: FC<{ searchTerm: string }> = ({ searchTerm }) => {
  const truncatedSearchTerm = searchTerm.length > 50 ? `${searchTerm.slice(0, 49)}…` : searchTerm;

  return (
    <StyledTypography>
      We couldn&apos;t find any repositories matching &apos;{truncatedSearchTerm}&apos; term
    </StyledTypography>
  );
};
