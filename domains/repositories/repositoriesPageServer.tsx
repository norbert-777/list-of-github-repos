import { SEARCH_QUERY } from '@domains/repositories/graphql/searchQuery.graphql';
import { createRepositoriesPathname } from '@domains/repositories/helpers/createRepositoriesPathname';
import { decodeSearchTerm } from '@domains/repositories/helpers/decodeSearchTerm';
import type { RepositoriesPageProperties } from '@domains/repositories/RepositoriesPage';
import { getPositiveIntegerQueryParameter } from '@domains/shared/helpers/getPositiveIntegerQueryParameter';
import { getStringQueryParameter } from '@domains/shared/helpers/getStringQueryParameter';
import { githubGraphQlClient } from '@domains/shared/ssr/githubGraphQlClient';
import { handleGraphResponse } from '@domains/shared/ssr/handleGraphResponse';
import type { GetStaticPaths, GetStaticProps } from 'next';

const REGENERATE_THE_PAGE_AT_MOST_IN_SECONDS = 60;
const DEFAULT_PER_PAGE_ITEMS = 20;

// "The total number of repositories that matched the search query. Regardless of the total number of matches, a maximum
// of 1,000 results will be available across all types."
// @link: https://docs.github.com/en/graphql/reference/objects#searchresultitemconnection
const MAX_PAGE_NUMBER = 1000 / DEFAULT_PER_PAGE_ITEMS;

/**
 * Function responsible for returning the data required to render the page
 */
export const createGetStaticProperties: (defaultSearchTerm?: string) => GetStaticProps<RepositoriesPageProperties> =
  (defaultSearchTerm) =>
  async ({ params: { searchTerm: rawSearchTerm, page: rawPage } = {} }) => {
    // Pre-validate query params
    const parsedSearchTerm = getStringQueryParameter(rawSearchTerm) ?? defaultSearchTerm; // use the fallback when available, e.g. react on the index page
    let parsedPage = getPositiveIntegerQueryParameter(rawPage);

    // If offset value is defined but invalid, return not found page
    if (!!rawPage && parsedPage === null) {
      return { notFound: true };
    }
    let searchTerm: string;
    parsedPage = parsedPage ?? 1; // Set the default value for the pagination if not defined

    if (parsedSearchTerm) {
      // parsedSearchTerm is encoded to let it use as the part of the URL
      searchTerm = decodeSearchTerm(parsedSearchTerm);
    } else {
      // otherwise return not found page
      return { notFound: true };
    }

    // Calculate the current page offset
    const offset = (parsedPage - 1) * DEFAULT_PER_PAGE_ITEMS;
    const base64OffsetAsCursor = Buffer.from(`cursor:${offset}`).toString('base64');

    // Execute the query and handle errors
    const data = handleGraphResponse(
      await githubGraphQlClient
        .query(SEARCH_QUERY, { after: base64OffsetAsCursor, first: DEFAULT_PER_PAGE_ITEMS, query: searchTerm })
        .toPromise(),
    );

    // Pagination - if the page is out of available boundary, redirect to the last page
    const { search } = data;
    const lastPage = Math.min(MAX_PAGE_NUMBER, Math.ceil(search.repositoryCount / DEFAULT_PER_PAGE_ITEMS));
    if (lastPage > 0 && parsedPage > lastPage) {
      return {
        redirect: {
          destination: createRepositoriesPathname({ searchTerm, page: lastPage, shouldEncodeSearchTerm: true }),
          permanent: false,
        },
      };
    } else if (lastPage === 0 && !!rawPage) {
      // No result to show - redirect to the main search page
      return {
        redirect: {
          destination: createRepositoriesPathname({ searchTerm, shouldEncodeSearchTerm: true }),
          permanent: false,
        },
      };
    }

    return {
      props: {
        pagination: {
          current: parsedPage,
          last: lastPage,
          perPage: DEFAULT_PER_PAGE_ITEMS,
          offset,
        },
        searchTerm,
        searchResults: search,
      },
      revalidate: REGENERATE_THE_PAGE_AT_MOST_IN_SECONDS,
    };
  };

/**
 * Function required to let Next.js know, that no page should be generated during the build for ISR process
 */
export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [], // Let's Next.js know that no page needs be created at build time
    fallback: 'blocking', // blocking - will server-render pages on-demand if the path doesn't exist
  };
};
