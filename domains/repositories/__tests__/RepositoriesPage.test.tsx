import type { GetRepositoriesQuery } from '@graphql/graphql';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import RepositoriesPage from '../RepositoriesPage';

const MOCKED_PUSH_FUNCTION = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: MOCKED_PUSH_FUNCTION,
  }),
}));
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: MOCKED_PUSH_FUNCTION,
    query: {},
  }),
}));

describe('RepositoriesPage', () => {
  const mockedSearchNode = {
    __typename: 'Repository',
    id: '1',
    forkCount: 10_111,
    name: 'Test name',
    stargazerCount: 10_200,
    url: '/test-name',
  } as const;
  const mockedSearchResults: GetRepositoriesQuery['search'] = {
    nodes: [
      { ...mockedSearchNode, id: '1' },
      { ...mockedSearchNode, id: '2' },
    ],
    repositoryCount: 100,
  };
  const mockedPagination = { current: 1, last: 5, offset: 0, perPage: 20 };
  const labels = {
    notFound: "We couldn't find",
    pagination: 'pagination navigation',
    searchInput: 'Search for GitHub repositories',
  } as const;

  it('has search form with prefilled values and allows to submit the form', async () => {
    // given
    render(
      <RepositoriesPage
        pagination={mockedPagination}
        searchResults={mockedSearchResults}
        searchTerm="Test default search term"
      />,
    );
    const searchInput = screen.getByLabelText(labels.searchInput);

    // when

    // then
    expect(searchInput).toHaveDisplayValue('Test default search term');

    // when
    await userEvent.type(searchInput, 'New term{Enter}');

    // then
    expect(MOCKED_PUSH_FUNCTION).toHaveBeenCalledTimes(1);
    expect(MOCKED_PUSH_FUNCTION).toHaveBeenCalledWith('/test%20default%20search%20termnew%20term');
  });

  it('displays found nodes, pagination and shows skeleton when the form is submitted', async () => {
    // given
    render(
      <RepositoriesPage
        pagination={mockedPagination}
        searchResults={mockedSearchResults}
        searchTerm="Test default search term"
      />,
    );
    const searchInput = screen.getByLabelText(labels.searchInput);

    // when

    // then
    expect(within(screen.getByTestId('repositories')).getAllByRole('listitem')).toHaveLength(2);
    expect(screen.queryByTestId('repositories-skeleton')).not.toBeInTheDocument();
    expect(screen.getByLabelText(labels.pagination)).toBeInTheDocument();

    // when
    await userEvent.type(searchInput, 'New term{Enter}');

    // then
    expect(within(screen.getByTestId('repositories-skeleton')).getAllByRole('listitem')).toHaveLength(2); // Skeleton is displayed in the list
    expect(screen.queryByTestId('repositories')).not.toBeInTheDocument();
    expect(screen.getByLabelText(labels.pagination)).toBeInTheDocument();
  });

  it('displays not found information without the pagination when no data to display', () => {
    render(
      <RepositoriesPage
        pagination={mockedPagination}
        searchResults={{ nodes: [], repositoryCount: 0 }}
        searchTerm="Test default search term"
      />,
    );

    expect(screen.getByText(labels.notFound, { exact: false })).toBeInTheDocument();
    expect(screen.queryByTestId(labels.pagination)).not.toBeInTheDocument();
  });

  it('has no pagination when there is only one page display', () => {
    render(
      <RepositoriesPage
        pagination={{ ...mockedPagination, current: 1, last: 1 }}
        searchResults={mockedSearchResults}
        searchTerm="Test default search term"
      />,
    );

    expect(screen.getByTestId('repositories')).toBeInTheDocument(); // ensure the results is displayed
    expect(screen.queryByTestId(labels.pagination)).not.toBeInTheDocument();
  });
});
