import babel from 'rollup-plugin-babel';

export default {
  input: 'src/index.js',
  output: {
    file: 'lib/index.js',
    format: 'cjs',
  },
  external: ['css-to-style', 'dom-parse', 'html-void-elements', 'react'],
  plugins: [babel()],
};
