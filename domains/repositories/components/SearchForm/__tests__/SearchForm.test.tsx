import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { SearchForm } from '../SearchForm';

const MOCKED_PUSH_FUNCTION = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: MOCKED_PUSH_FUNCTION,
  }),
}));

describe('SearchForm component', () => {
  const labels = {
    searchInput: 'Search for GitHub repositories',
    searchButton: 'Search',
  } as const;

  it('does not let submit the form when empty input is submitted by keyboard', async () => {
    // given
    const onHandleSubmitMock = jest.fn();
    render(<SearchForm onSubmitSuccess={onHandleSubmitMock} />);
    const searchInput = screen.getByLabelText(labels.searchInput);

    // when
    await userEvent.type(searchInput, '{Enter}');

    // then
    expect(MOCKED_PUSH_FUNCTION).not.toHaveBeenCalled(); // no route change
    expect(onHandleSubmitMock).not.toHaveBeenCalled(); // no callback call
  });

  it('does not let submit the form when empty input is submitted by button', async () => {
    // given
    const onHandleSubmitMock = jest.fn();
    render(<SearchForm onSubmitSuccess={onHandleSubmitMock} />);
    const searchButton = screen.getByLabelText(labels.searchButton);

    // when
    await userEvent.click(searchButton);

    // then
    expect(MOCKED_PUSH_FUNCTION).not.toHaveBeenCalled(); // no route change
    expect(onHandleSubmitMock).not.toHaveBeenCalled(); // no callback call
  });

  it('submits the form when input is filled in and a user press Enter button', async () => {
    // given
    const onHandleSubmitMock = jest.fn();
    render(<SearchForm onSubmitSuccess={onHandleSubmitMock} />);
    const searchInput = screen.getByLabelText(labels.searchInput);

    // when
    await userEvent.type(searchInput, 'AbCD $ 4{Enter}');

    // then
    expect(MOCKED_PUSH_FUNCTION).toHaveBeenCalledTimes(1);
    expect(MOCKED_PUSH_FUNCTION).toHaveBeenCalledWith('/abcd%20%24%204');
    expect(onHandleSubmitMock).toHaveBeenCalledTimes(1);
  });

  it('submits the form when input is filled in and a user press search button', async () => {
    // given
    const onHandleSubmitMock = jest.fn();
    render(<SearchForm onSubmitSuccess={onHandleSubmitMock} />);
    const searchButton = screen.getByLabelText(labels.searchButton);
    const searchInput = screen.getByLabelText(labels.searchInput);

    // when
    await userEvent.type(searchInput, 'AbCdE $ 5');
    await userEvent.click(searchButton);

    // then
    expect(MOCKED_PUSH_FUNCTION).toHaveBeenCalledTimes(1);
    expect(MOCKED_PUSH_FUNCTION).toHaveBeenCalledWith('/abcde%20%24%205');
    expect(onHandleSubmitMock).toHaveBeenCalledTimes(1);
  });

  it('displays the searched term passed by props and allows to change it', async () => {
    // given
    const onHandleSubmitMock = jest.fn();
    render(<SearchForm onSubmitSuccess={onHandleSubmitMock} defaultSearchTerm="Search term" />);
    const searchInput = screen.getByLabelText(labels.searchInput);

    // when

    // then
    expect(searchInput).toHaveDisplayValue('Search term');

    // when
    await userEvent.type(searchInput, '{Backspace}2{Enter}');

    // then
    // -> The input value changes
    expect(searchInput).toHaveDisplayValue('Search ter2');

    // -> and it performs route update
    expect(MOCKED_PUSH_FUNCTION).toHaveBeenCalledTimes(1);
    expect(MOCKED_PUSH_FUNCTION).toHaveBeenCalledWith('/search%20ter2');
    expect(onHandleSubmitMock).toHaveBeenCalledTimes(1);
  });
});
