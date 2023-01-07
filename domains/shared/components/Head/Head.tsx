import NextHead from 'next/head';
import type { FC } from 'react';

interface Properties {
  description?: string;
  title?: string;
}

const DEFAULT_DESCRIPTION = 'Example of the React application to fetch a list of the GitHub repositories';
const DEFAULT_TITLE = 'GitHub Repositories';

export const createTitle = (main: string): string | undefined => {
  if (main.length === 0) {
    return undefined;
  }

  if (main.length > 50) {
    return `${main.slice(0, 50)}... - ${DEFAULT_TITLE}`;
  }

  return `${main} - ${DEFAULT_TITLE}`;
};

export const Head: FC<Properties> = ({ description = DEFAULT_DESCRIPTION, title = DEFAULT_TITLE }) => {
  return (
    <NextHead>
      <title>{title}</title>
      <meta name="description" content={description} />
    </NextHead>
  );
};
