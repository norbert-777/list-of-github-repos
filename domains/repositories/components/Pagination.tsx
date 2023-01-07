import { createRepositoriesPathname } from '@domains/repositories/helpers/createRepositoriesPathname';
import { encodeSearchTerm } from '@domains/repositories/helpers/encodeSearchTerm';
import NoSsr from '@mui/material/NoSsr';
import type { PaginationProps } from '@mui/material/Pagination';
import BasePagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Link from 'next/link';

import { PaginationSkeleton, Wrapper } from './Pagination.theme';

export const Pagination = (properties: PaginationProps & { searchTerm: string }) => {
  const { searchTerm, ...propertiesToPass } = properties;
  const theme = useTheme();
  const isSmBreakpoint = useMediaQuery(theme.breakpoints.up('sm'));
  const encodedToUrlSearchTerm = encodeSearchTerm(searchTerm);

  // We don't want to display the pagination if there is only one page or none
  // Defer it's displaying in reference to avoid CLS/blinking connected with breakpoint sizes

  return (
    <Wrapper>
      <NoSsr fallback={<PaginationSkeleton variant="rounded" />}>
        <BasePagination
          variant="outlined"
          shape="rounded"
          siblingCount={isSmBreakpoint ? 2 : 0}
          size="medium"
          renderItem={(item) => (
            <PaginationItem
              component={Link}
              href={createRepositoriesPathname({ searchTerm: encodedToUrlSearchTerm, page: item.page })}
              {...item}
            />
          )}
          {...propertiesToPass}
        />
      </NoSsr>
    </Wrapper>
  );
};
