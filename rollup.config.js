import replace from '@rollup/plugin-replace';
import babel from 'rollup-plugin-babel';

export default [
  {
    input: 'src/index.js',
    output: { file: 'lib/browser.js', format: 'cjs' },
    external: ['css-to-style', 'html-void-elements', 'react'],
    plugins: [replace({ 'process.env.BROWSER': true }), babel()],
  },
  {
    input: 'src/index.js',
    output: { file: 'lib/server.js', format: 'cjs' },
    external: ['css-to-style', 'html-void-elements', 'jsdom', 'react'],
    plugins: [replace({ 'process.env.BROWSER': false })],
  },
];
