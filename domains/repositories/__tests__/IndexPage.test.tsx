import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import IndexPage from '../IndexPage';

const MOCKED_PUSH_FUNCTION = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: MOCKED_PUSH_FUNCTION,
  }),
}));

describe('IndexPage', () => {
  it('has search form and allows to submit', async () => {
    // given
    render(<IndexPage />);
    const searchInput = screen.getByLabelText('Search for GitHub repositories');

    // when
    await userEvent.type(searchInput, 'My input{Enter}');

    // then
    expect(MOCKED_PUSH_FUNCTION).toHaveBeenCalledTimes(1);
    expect(MOCKED_PUSH_FUNCTION).toHaveBeenCalledWith('/my%20input');
  });

  it('allows to use suggestion', () => {
    render(<IndexPage />);

    const suggestedLinkTerm = screen.getByRole('link', { name: 'React' });
    expect(suggestedLinkTerm).toHaveAttribute('href', '/react');
  });
});
