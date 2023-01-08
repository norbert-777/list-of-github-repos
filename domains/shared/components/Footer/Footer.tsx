import type { FC } from 'react';
import { useMemo } from 'react';

import { StyledContainer } from './Footer.theme';

export const Footer: FC = () => {
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return <StyledContainer maxWidth="md">&copy; Norbert {currentYear}</StyledContainer>;
};
