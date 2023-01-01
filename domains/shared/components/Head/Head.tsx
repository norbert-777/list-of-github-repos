import NextHead from 'next/head';
import type { FC } from 'react';

interface Properties {
  description?: string;
  title?: string;
}

const DEFAULT_DESCRIPTION = 'Example of the React application to fetch a list of the GitHub repositories';
const DEFAULT_TITLE = 'GitHub Repositories';

export const Head: FC<Properties> = ({ description = DEFAULT_DESCRIPTION, title = DEFAULT_TITLE }) => {
  return (
    <NextHead>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="apple-touch-icon" sizes="180x180" href="/manifest/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/manifest/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/manifest/favicon-16x16.png" />
      <link rel="manifest" href="/manifest/site.webmanifest" />
    </NextHead>
  );
};
