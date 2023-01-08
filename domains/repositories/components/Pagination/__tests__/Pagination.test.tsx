import useMediaQuery from '@mui/material/useMediaQuery';
import { render, screen } from '@testing-library/react';

import { Pagination } from '../Pagination';

jest.mock('@mui/material/useMediaQuery');

describe('Pagination component', () => {
  describe('small screens', () => {
    beforeAll(() => {
      jest.mocked(useMediaQuery).mockReturnValue(false);
    });

    it('renders specific variant for small screens', () => {
      render(<Pagination count={50} defaultPage={25} searchTerm="Search term" />);

      const links = screen.getAllByRole('link');

      expect(links).toHaveLength(5);
      expect(screen.getByLabelText('Go to previous page')).toHaveAttribute('href', '/search%20term/24');
      expect(screen.getByLabelText('Go to page 1')).toHaveAttribute('href', '/search%20term');
      expect(screen.getByLabelText('page 25')).toHaveAttribute('href', '/search%20term/25');
      expect(screen.getByLabelText('Go to page 50')).toHaveAttribute('href', '/search%20term/50');
      expect(screen.getByLabelText('Go to next page')).toHaveAttribute('href', '/search%20term/26');
    });
  });

  describe('>= sm breakpoint', () => {
    beforeAll(() => {
      jest.mocked(useMediaQuery).mockReturnValue(true);
    });

    it('renders specific variant for sm breakpoint', () => {
      render(<Pagination count={50} defaultPage={25} searchTerm="Search term" />);

      const links = screen.getAllByRole('link');

      expect(links).toHaveLength(9);
      expect(screen.getByLabelText('Go to previous page')).toHaveAttribute('href', '/search%20term/24');
      expect(screen.getByLabelText('Go to page 1')).toHaveAttribute('href', '/search%20term');
      expect(screen.getByLabelText('Go to page 23')).toHaveAttribute('href', '/search%20term/23');
      expect(screen.getByLabelText('Go to page 24')).toHaveAttribute('href', '/search%20term/24');
      expect(screen.getByLabelText('page 25')).toHaveAttribute('href', '/search%20term/25');
      expect(screen.getByLabelText('Go to page 26')).toHaveAttribute('href', '/search%20term/26');
      expect(screen.getByLabelText('Go to page 27')).toHaveAttribute('href', '/search%20term/27');
      expect(screen.getByLabelText('Go to page 50')).toHaveAttribute('href', '/search%20term/50');
      expect(screen.getByLabelText('Go to next page')).toHaveAttribute('href', '/search%20term/26');
    });
  });
});
