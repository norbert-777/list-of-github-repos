import type { ContainerProps } from '@mui/material/Container';
import type { FC } from 'react';

import { StyledContainer } from './PageContent.theme';

export const PageContent: FC<ContainerProps> = (properties) => (
  <main>
    <StyledContainer maxWidth="md" {...properties}>
      {properties.children}
    </StyledContainer>
  </main>
);
