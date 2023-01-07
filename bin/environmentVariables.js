/**
 * This script is a helper for making sure that all env variables are defined before running the app.
 *
 * This file is shared between TS and next.config.js (which isn't directly parsed), which is the reason of keeping it
 * in JS type.
 */
const process = require('node:process');

const { GITHUB_GRAPHQL_TOKEN, GITHUB_GRAPHQL_URL } = process.env;

const getMissingEnvironmentVariableMessage = (variableName) =>
  `Please provide "${variableName}" env variable to continue!\nProbably you need to update ".env.*" file`;

if (!GITHUB_GRAPHQL_URL) {
  throw new Error(getMissingEnvironmentVariableMessage('GITHUB_GRAPHQL_URL'));
}
if (!GITHUB_GRAPHQL_TOKEN) {
  throw new Error(getMissingEnvironmentVariableMessage('GITHUB_GRAPHQL_TOKEN'));
}

module.exports = { GITHUB_GRAPHQL_TOKEN, GITHUB_GRAPHQL_URL };
