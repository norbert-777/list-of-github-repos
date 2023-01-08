import { decodeSearchTerm } from '../decodeSearchTerm';

describe('decodeSearchTerm()', () => {
  it('returns decoded search term', () => {
    expect(decodeSearchTerm('search%20term')).toEqual('search term');
  });
});
