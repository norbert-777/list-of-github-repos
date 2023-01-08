import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import NextLink from 'next/link';
import type { FC } from 'react';

import { StyledAppBar } from './Header.theme';

export const Header: FC = () => (
  <StyledAppBar position="static">
    <Typography variant="h6" component="h1">
      <NextLink href="/" legacyBehavior passHref>
        <Link color="inherit" underline="none">
          List of GitHub repositories
        </Link>
      </NextLink>
    </Typography>
  </StyledAppBar>
);
