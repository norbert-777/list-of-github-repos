import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import type { FC } from 'react';

import { StyledForkRightOutlinedIcon, StyledOpenInNewIcon, StyledStarOutlineIcon } from './RepositoriesListItem.theme';

const NUMBER_LOCALES = 'en';

export const RepositoriesListItem: FC<{ forkCount: number; name: string; stargazerCount: number; url: string }> = ({
  forkCount,
  name,
  stargazerCount,
  url,
}) => {
  return (
    <li>
      <Card variant="outlined">
        <Grid container columnSpacing={2} rowSpacing={1} padding={2}>
          <Grid item xs={12} sm={9}>
            <Link href={url} target="_blank" rel="noopener" underline="hover">
              {name} <StyledOpenInNewIcon />
            </Link>
          </Grid>
          <Grid item xs={6} sm={1.5} data-testid="likes">
            <StyledStarOutlineIcon color="secondary" />
            {stargazerCount.toLocaleString(NUMBER_LOCALES)}
          </Grid>
          <Grid item xs={6} sm={1.5} data-testid="forks">
            <StyledForkRightOutlinedIcon color="secondary" />
            {forkCount.toLocaleString(NUMBER_LOCALES)}
          </Grid>
        </Grid>
      </Card>
    </li>
  );
};
