import { render, screen } from '@testing-library/react';

import { RepositoriesListSkeleton } from '../RepositoriesListSkeleton';

describe('RepositoriesListSkeleton component', () => {
  it('renders items number depends on length parameter', () => {
    render(<RepositoriesListSkeleton length={4} />);

    // it has the correct list length
    expect(screen.getAllByRole('listitem')).toHaveLength(4);
  });
});
