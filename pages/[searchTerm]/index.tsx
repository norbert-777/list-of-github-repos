import { createGetStaticProperties } from '@domains/repositories/repositoriesPageServer';

export { default } from '@domains/repositories/RepositoriesPage';
export { getStaticPaths } from '@domains/repositories/repositoriesPageServer';

export const getStaticProps = createGetStaticProperties();
