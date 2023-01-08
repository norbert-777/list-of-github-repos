import { render, screen } from '@testing-library/react';

import { NoResults } from '../NoResults';

describe('NoResults component', () => {
  it('has information about no matching results', () => {
    const searchTerm = '12345678901234567890123456789012345678901234567890'; // Search term contain 50 chars
    render(<NoResults searchTerm={searchTerm} />);

    const expectedText =
      "We couldn't find any repositories matching '12345678901234567890123456789012345678901234567890' term";
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('truncates search term when it is longer than 50 chars', () => {
    const searchTerm = '123456789012345678901234567890123456789012345678901'; // Search term contain 50 chars
    render(<NoResults searchTerm={searchTerm} />);

    const expectedText =
      "We couldn't find any repositories matching '1234567890123456789012345678901234567890123456789…' term";
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
