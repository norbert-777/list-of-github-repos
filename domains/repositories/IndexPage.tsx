import { SearchForm } from '@domains/repositories/components/SearchForm/SearchForm';
import { createRepositoriesPathname } from '@domains/repositories/helpers/createRepositoriesPathname';
import { Head } from '@domains/shared/components/Head/Head';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import NextLink from 'next/link';
import type { FC } from 'react';

import { StyledCaptionGrid, StyledIndexPageContent } from './IndexPage.theme';

const IndexPage: FC = () => {
  return (
    <>
      <Head />
      <Container>
        <StyledIndexPageContent>
          <Grid container maxWidth="sm" rowSpacing={2}>
            <Grid item xs={12}>
              <SearchForm />
            </Grid>
            <StyledCaptionGrid item xs={12}>
              <Typography variant="caption">
                Please enter a search term or try with{' '}
                <NextLink
                  legacyBehavior
                  href={createRepositoriesPathname({ searchTerm: 'react', shouldEncodeSearchTerm: true })}
                  passHref
                >
                  <Link>React</Link>
                </NextLink>
              </Typography>
            </StyledCaptionGrid>
          </Grid>
        </StyledIndexPageContent>
      </Container>
    </>
  );
};

export default IndexPage;
