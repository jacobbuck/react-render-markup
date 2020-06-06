import babel from 'rollup-plugin-babel';

export default {
  input: 'src/index.js',
  output: {
    file: 'lib/index.js',
    format: 'es',
  },
  external: ['css-to-style', 'dom-parse', 'react'],
  plugins: [babel()],
};
