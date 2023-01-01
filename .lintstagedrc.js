const path = require('node:path');

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames.map((f) => path.relative(process.cwd(), f)).join(' --file ')}`;

const checkTs = () => 'yarn ts:check';

module.exports = {
  '**/*.{ts,tsx}': [checkTs],
  '*.{js,jsx,ts,tsx}': [buildEslintCommand],
  '**/*': 'prettier --write --ignore-unknown',
};
