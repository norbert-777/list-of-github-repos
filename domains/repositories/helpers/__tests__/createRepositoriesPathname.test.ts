import { createRepositoriesPathname } from '../createRepositoriesPathname';

describe('createRepositoriesPathname()', () => {
  describe('with shouldEncodeSearchTerm=true', () => {
    it.each([
      // expected return value | input: searchTerm | input: page
      ['/', undefined, undefined],
      ['/search%20term', 'Search term', undefined],
      ['/', undefined, 1],
      ['/search%20term', 'Search term', 1],
      ['/search%20term/2', 'Search term', 2],
      ['/search%20term/3', 'Search term', 3],
    ])('returns %s when parameter searchTerm=%s & page=%s', (expectedResult, searchTerm, page) => {
      expect(
        createRepositoriesPathname({
          page,
          searchTerm,
          shouldEncodeSearchTerm: true,
        }),
      ).toEqual(expectedResult);
    });
  });

  /**
   * Note: this variant should be used when passed already encoded searchTerm param
   */
  describe('with shouldEncodeSearchTerm=false', () => {
    it.each([
      // expected return value | input: searchTerm | input: page
      ['/', undefined, undefined],
      ['/Search term', 'Search term', undefined],
      ['/', undefined, 1],
      ['/Search term', 'Search term', 1],
      ['/Search term/2', 'Search term', 2],
      ['/Search term/3', 'Search term', 3],
    ])('returns %s when parameter searchTerm=%s & page=%s', (expectedResult, searchTerm, page) => {
      expect(
        createRepositoriesPathname({
          page,
          searchTerm,
          shouldEncodeSearchTerm: false,
        }),
      ).toEqual(expectedResult);
    });
  });
});
