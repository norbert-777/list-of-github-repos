import type { ContainerProps } from '@mui/material/Container';
import Container from '@mui/material/Container';
import type { FC } from 'react';

export const Content: FC<ContainerProps> = (properties) => (
  <Container maxWidth="md" component="main" {...properties}>
    {properties.children}
  </Container>
);
