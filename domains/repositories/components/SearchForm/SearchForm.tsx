import { createRepositoriesPathname } from '@domains/repositories/helpers/createRepositoriesPathname';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from 'next/navigation';
import type { FC, FormEvent } from 'react';
import { memo, useCallback, useRef } from 'react';

import { StyledContainer, StyledInputBase, StyledSearchButton } from './SearchForm.theme';

export const SearchFormBase: FC<{ className?: string; onSubmitSuccess?: () => void; defaultSearchTerm?: string }> = ({
  className,
  onSubmitSuccess,
  defaultSearchTerm,
}) => {
  const inputReference = useRef<HTMLInputElement>();
  const { push } = useRouter();

  const handleOnSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault(); // Handle route change with next/navigation

      const searchValue = inputReference.current?.value?.trim();

      if (!searchValue) {
        // Prevent changing the search page when the field is empty

        return;
      }

      onSubmitSuccess?.();
      push(createRepositoriesPathname({ searchTerm: searchValue, shouldEncodeSearchTerm: true }));
    },
    [onSubmitSuccess, push],
  );

  return (
    <form className={className} onSubmit={handleOnSubmit}>
      <StyledContainer>
        <StyledInputBase
          defaultValue={defaultSearchTerm}
          inputProps={{ 'aria-label': 'Search for GitHub repositories' }}
          inputRef={inputReference}
          placeholder="Search GitHub repositories"
        />
        <StyledSearchButton aria-label="Search" type="submit">
          <SearchIcon />
        </StyledSearchButton>
      </StyledContainer>
    </form>
  );
};

export const SearchForm = memo(SearchFormBase);
