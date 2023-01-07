/**
 * Helper responsible for encoding search term in the URL
 */
export const encodeSearchTerm = (searchTerm: string): string => encodeURIComponent(searchTerm.toLowerCase());
