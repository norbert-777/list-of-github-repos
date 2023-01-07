import type { CodegenConfig } from '@graphql-codegen/cli';
import { config as environmentConfig } from 'dotenv';

environmentConfig({ path: '.env.local', debug: true });
environmentConfig();

import { GITHUB_GRAPHQL_TOKEN, GITHUB_GRAPHQL_URL } from './bin/environmentVariables';

/** You can read more about this config
 * * on: @link https://formidable.com/open-source/urql/docs/basics/typescript-integration/
 * * and: @link https://the-guild.dev/graphql/codegen/docs/config-reference/codegen-config
 */
const config: CodegenConfig = {
  schema: [
    {
      [GITHUB_GRAPHQL_URL]: {
        headers: {
          Authorization: `Bearer ${GITHUB_GRAPHQL_TOKEN}`,
        },
      },
    },
  ],
  documents: ['domains/**/*.graphql.ts'],
  hooks: {
    afterAllFileWrite: ['prettier --write'],
  },
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    './generated/graphql/': {
      preset: 'client',
      plugins: [],
      config: {
        enumsAsTypes: true,
      },
    },
  },
};

export default config;
