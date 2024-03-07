import { createElement, Fragment } from 'react';
import { Bench } from 'tinybench';
import { renderMarkup } from '../dist/react-render-markup.js';

const bench = new Bench();

const markup = `
  <h1>Lorem Ipsum</h1>
  <p><strong>Pellentesque habitant morbi tristique</strong> senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. <em>Aenean ultricies mi vitae est.</em> Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, <code>commodo vitae</code>, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. <a href="#">Donec non enim</a> in turpis pulvinar facilisis. Ut felis.</p>
  <h2>Header Level 2</h2>
  <ol>
     <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
     <li>Aliquam tincidunt mauris eu risus.</li>
  </ol>
  <blockquote><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus magna. Cras in mi at felis aliquet congue. Ut a est eget ligula molestie gravida. Curabitur massa. Donec eleifend, libero at sagittis mollis, tellus est malesuada tellus, at luctus turpis elit sit amet quam. Vivamus pretium ornare est.</p></blockquote>
  <h3>Header Level 3</h3>
  <ul>
     <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
     <li>Aliquam tincidunt mauris eu risus.</li>
  </ul>
`;

const allowed = [
  'h1',
  'h2',
  'h3',
  'p',
  'blockquote',
  'ul',
  'ol',
  'li',
  'code',
  'strong',
  'em',
  'a',
];

const replace = {
  a: (props) => createElement('a', { ...props }),
  em: createElement('i', { className: 'code' }),
  code: Fragment,
  strong: 'b',
};

bench
  .add('simple markup', () => {
    renderMarkup('Hello <a href="/">world</a>');
  })
  .add('nested markup', () => {
    renderMarkup(markup);
  })
  .add('nested markup with allowed option', async () => {
    renderMarkup(markup, { allowed });
  })
  .add('nested markup with replace option', async () => {
    renderMarkup(markup, { replace });
  })
  .add('nested markup with trim option', async () => {
    renderMarkup(markup, { trim: true });
  });

await bench.warmup();
await bench.run();

console.table(bench.table());
