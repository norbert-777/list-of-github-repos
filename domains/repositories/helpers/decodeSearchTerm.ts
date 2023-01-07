/**
 * Helper responsible for decoding search term from the URL
 */
export const decodeSearchTerm = (searchTerm: string): string => encodeURIComponent(searchTerm);
