import { Pagination } from '@domains/repositories/components/Pagination';
import { Content } from '@domains/shared/components/Content/Content';
import { createTitle, Head } from '@domains/shared/components/Head/Head';
import { Header } from '@domains/shared/components/Header/Header';
import type { GetRepositoriesQuery } from '@graphql/graphql';
import ForkRightOutlinedIcon from '@mui/icons-material/ForkRightOutlined';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import SearchIcon from '@mui/icons-material/Search';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import type { ChangeEvent, FC } from 'react';
import React, { useCallback, useEffect, useRef, useState } from 'react';

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

  const handleChange = useCallback((event: ChangeEvent<unknown>, value: number) => {
    setIsRouteChangeInProgress(true);
    console.log('>>>> CHANGE PAGE', value);
  }, []);

  const numberFormat = useRef(new Intl.NumberFormat('en'));

  return (
    <>
      <Head title={createTitle(searchTerm)} />

      <Header />

      <Container maxWidth="md" sx={{ mt: 2, mb: 4 }}>
        <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            defaultValue={searchTerm}
            placeholder="Search GitHub"
            inputProps={{ 'aria-label': 'Search GitHub' }}
          />
          <IconButton type="button" sx={{ p: '10px' }} aria-label="Search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </Container>

      <Content>
        {repositoryCount ? (
          <>
            <Typography variant="h5" component="h2" sx={{ my: 2 }}>
              Showing {repositoryCount} available repository results
            </Typography>
            {isRouteChangeInProgress ? 'Loading....' : ''}
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {nodes?.map((node) => {
                console.log(node);

                if (!node || node.__typename !== 'Repository') {
                  return null;
                }
                const { forkCount, id, name, stargazerCount } = node;

                return (
                  <Card key={id} variant="outlined" component="li" sx={{ mb: 1, '&:last-child': { mb: 0 } }}>
                    <Grid container columnSpacing={2} rowSpacing={1} padding={2}>
                      <Grid item xs={12} sm={9}>
                        <Link href="#" target="_blank" rel="noopener" underline="hover">
                          {name} <OpenInNewIcon sx={{ fontSize: 'inherit', mb: '-2px', ml: '2px' }} />
                        </Link>
                      </Grid>
                      <Grid item xs={6} sm={1.5}>
                        <StarOutlineIcon sx={{ fontSize: 'inherit', mb: '-2px', mr: '2px' }} color="secondary" />
                        {numberFormat.current.format(stargazerCount)}
                      </Grid>
                      <Grid item xs={6} sm={1.5}>
                        <ForkRightOutlinedIcon sx={{ fontSize: 'inherit', mb: '-2px', mr: '2px' }} color="secondary" />
                        {numberFormat.current.format(forkCount)}
                      </Grid>
                    </Grid>
                  </Card>
                );
              })}
            </ul>
            {last > 1 ? (
              <Pagination count={last} defaultPage={current} onChange={handleChange} searchTerm={searchTerm} />
            ) : null}
            @TODO homepage
          </>
        ) : (
          <Content>We couldn&apos;t find any repositories matching &apos;{searchTerm}&apos; term</Content>
        )}
      </Content>
      <Container maxWidth="md" sx={{ mt: 2, mb: 0.5 }}>
        &copy; Norbert {new Date().getFullYear()}
      </Container>
    </>
  );
};

export default RepositoriesPage;
