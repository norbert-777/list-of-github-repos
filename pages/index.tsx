import { encodeSearchTerm } from '@domains/repositories/helpers/encodeSearchTerm';
import { createGetStaticProperties } from '@domains/repositories/repositoriesPageServer';

export { default } from '@domains/repositories/RepositoriesPage';

const DEFAULT_SEARCH_TERM = encodeSearchTerm('react');

export const getStaticProps = createGetStaticProperties(DEFAULT_SEARCH_TERM);
