const path = require('node:path');

const buildEslintCommand = (filenames) =>
  `yarn ts:lint --file ${filenames.map((f) => path.relative(process.cwd(), f)).join(' --file ')}`;

const checkTs = () => 'yarn ts:types-check';

module.exports = {
  '**/*.{ts,tsx}': [checkTs],
  '*.{js,jsx,ts,tsx}': [buildEslintCommand],
  '**/*': 'prettier --write --ignore-unknown',
};
