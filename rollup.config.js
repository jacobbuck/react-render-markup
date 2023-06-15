import babel from '@rollup/plugin-babel';

export default {
  input: './src/index.js',
  output: [
    { file: './lib/index.cjs.js', format: 'cjs', sourcemap: true },
    { file: './lib/index.esm.js', format: 'esm', sourcemap: true },
  ],
  external: [
    'css-to-style',
    'dom-parse',
    'prop-types',
    'react',
    'react-display-name',
    'tiny-invariant',
  ],
  plugins: [babel({ babelHelpers: 'bundled' })],
};
