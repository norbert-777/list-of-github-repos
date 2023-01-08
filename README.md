# GitHub Repositories Search using GraphQL with NextJS demo

## Demo

Demo is available thanks to Vercel. It was created during when the projected started and it's available is not guaranteed
to the GitHub & Vercel personal project limitations.

To see the demo visit:

- TBA

## Preconditions

To start the project locally:

1. Clone the repository
2. Create `.env.local` file, with content

```dotenv
GITHUB_GRAPHQL_TOKEN=<TOKEN>
```

where `<TOKEN>` is your person GitHub token. You can find step-by-step instruction in
[GitHub Docs](https://docs.github.com/en/enterprise-server@3.4/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token).
Please use "Classic" token.

Required privileges:

- repo -> public_repo (to search in the public repositories scope)

## Notes from the repository owner

1. In the project is used ISR, to let create static pages and to avoid GitHub private token exposure. Thanks to that you are able to see the demo version.
2. Material MUI implementation was done based on official example: https://github.com/mui/material-ui/tree/HEAD/examples/nextjs-with-typescript .
3. One of the goal of this project was to play with [MUI](https://mui.com/) library design library and check the possibilities and changes since AngularJS.
4. MUI is quite well testes, so there is no reason to duplicate unit tests connected with their library.

## Core libraries used in the project:

1. Next.js v13 based on React & TypeScript
2. MUI - UI tools library based on Emotion
3. testing-library - unit testing
4. Cypress - e2e testing
5. ESLint - static file analysis
6. Prettier - Code formatter
7. lint-stage - pre-commit & pre-push hooks execution
8. graphql & urql - responsible for fetching data in GraphQL
9. Codegen - to automatically generate TS types based on the GraphQL query schema

## Project structure

- _bin_ - contains scripts responsible for running the environment
- _cypress_ - contains e2e tests
- _domains_ - aka `src` directory - domain-driven design
  - _shared_ - specific domain responsible for sharing functionality across the core domains
- _generated_ - directory contains the generated code by other scrips
  - _graphql_ - TypeScrip types generated using Codegen base on `*.graphql.ts` files in domains directory
- _pages_ - Next.js routing directory
- _public_ - Next.js public directory
- _styles_ - contains specific styles files, styles cache, theme files, etc.

Other:

- **\_\_mocks\_\_** - directory contains files testing-library mocks
- **\domains/\*\*/graphql/\*.graphql.ts** - files with GraphQL queries
- **\_\_tests\_\_/\*.test.ts(x)** - files with testing-library tests
- **cypress/e2e/\*\*/\*.cy.ts** - files with e2e tests suites
- **\*.theme.ts(x)** - files with externalized components-styling

## Getting Started - running the app locally in development mode

1. Make sure you have `yarn` installed globally. [How to?](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable)
2. Install dependencies `yarn`.
3. Start the dev version `yarn dev`.
4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Available scripts

| Command               | Description                                                               |
| --------------------- | ------------------------------------------------------------------------- |
| `yarn dev`            | Start env in development mode                                             |
| `yarn build`          | Build the app production version                                          |
| `yarn start`          | Start the app production version (pre-requirement to run `yarn build`)    |
| `yarn test`           | Run test using `testing-library`                                          |
| `yarn test:ci`        | Run test using `testing-library` like in CI (pipeline)                    |
| `yarn ts:lint`        | Run linting tool in the `autofix` mode                                    |
| `yarn ts:types-check` | Run types checking using TSC                                              |
| `yarn codegen`        | Generates TypeScript types base on queries stored in `*.graphql.ts` files |
| `yarn e2e`            | Run e2e tests locally                                                     |
| `yarn e2e:ci`         | Responsible for running e2e tests in CI env                               |
| `yarn prepare`        | Internal command used by `lint-stage` to install required deps            |

### Good to know

- In the project is used Codegen, which is responsible for automatically generating TS types based on the GraphQL query schema,
  which are stored in \*.graphql.ts files. In the development mode, please either run codegen in watch mode or run it
  after any query update.

## Plans for future

- Configure GitHub pipeline
- Increase tests coverage
