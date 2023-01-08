import type { GetRepositoriesQuery } from '@graphql/graphql';
import { render, screen, within } from '@testing-library/react';

import { RepositoriesList } from '../RepositoriesList';

describe('RepositoriesList component', () => {
  it('does not render anything when nodes=null', () => {
    render(<RepositoriesList nodes={null} />);

    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });

  it('does not render anything when nodes=[]', () => {
    render(<RepositoriesList nodes={[]} />);

    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });

  it('renders all provided nodes with core elements', () => {
    const nodes: GetRepositoriesQuery['search']['nodes'] = [
      { __typename: 'Repository', id: '1', forkCount: 10_111, name: 'Name 1', stargazerCount: 10_200, url: '/test-1' },
      { __typename: 'Repository', id: '2', forkCount: 20_111, name: 'Name 2', stargazerCount: 20_200, url: '/test-2' },
    ];
    render(<RepositoriesList nodes={nodes} />);

    const items = screen.getAllByRole('listitem');

    // it has the correct list length
    expect(items).toHaveLength(2);

    // it has the valid link in each item
    expect(within(items[0]).getByRole('link')).toHaveAttribute('href', '/test-1');
    expect(within(items[0]).getByRole('link')).toHaveTextContent('Name 1');
    expect(within(items[1]).getByRole('link')).toHaveAttribute('href', '/test-2');
    expect(within(items[1]).getByRole('link')).toHaveTextContent('Name 2');

    // it has formatted 'likes' value for each item
    expect(within(items[0]).getByTestId('likes')).toHaveTextContent('10,200');
    expect(within(items[1]).getByTestId('likes')).toHaveTextContent('20,200');

    // it has formatted 'forks' value for each item
    expect(within(items[0]).getByTestId('forks')).toHaveTextContent('10,111');
    expect(within(items[1]).getByTestId('forks')).toHaveTextContent('20,111');
  });
});
