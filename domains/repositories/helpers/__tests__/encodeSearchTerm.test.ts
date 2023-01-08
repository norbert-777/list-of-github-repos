import { encodeSearchTerm } from '../encodeSearchTerm';

describe('encodeSearchTerm()', () => {
  it('returns encoded search term with replaced special chars and lowercase', () => {
    expect(encodeSearchTerm('Search term &?#5')).toEqual('search%20term%20%26%3F%235');
  });
});
