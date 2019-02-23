import babel from 'rollup-plugin-babel';

export default {
  input: 'src/index.js',
  output: {
    file: 'lib/index.js',
    format: 'cjs',
  },
  external: [
    'css-to-style',
    'html-tag-names',
    'html-void-elements',
    'jsdom',
    'mathml-tag-names',
    'react',
    'svg-tag-names',
  ],
  plugins: [babel()],
};
