import { encodeSearchTerm } from '@domains/repositories/helpers/encodeSearchTerm';

/**
 * Helper responsible for pathname creations for repositories.
 */
export const createRepositoriesPathname = ({
  searchTerm,
  page,
  shouldEncodeSearchTerm = false,
}: {
  searchTerm?: string | null;
  page?: number | null;
  shouldEncodeSearchTerm?: boolean;
}) => {
  if (!searchTerm) {
    return '/';
  }
  const encodedSearchTerm = shouldEncodeSearchTerm ? encodeSearchTerm(searchTerm) : searchTerm;
  let pageSuffix = '';

  if (page && page > 1) {
    pageSuffix = `/${page}`;
  }

  return `/${encodedSearchTerm}${pageSuffix}`;
};
