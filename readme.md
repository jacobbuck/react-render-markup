# react-render-markup

Parse HTML markup into React elements.

## Example

```js
import renderMarkup from 'react-render-markup';
const MyComponent = props => <div>{renderMarkup(props.arbitraryHtml)}</div>;
```

## XSS

Only `<script>` tags and event attributes are disallowed. If you're parsing user inputed markup, you'll want to use some sort of [HTML sanitizer](https://www.npmjs.com/search?q=html%20sanitizer&page=1&ranking=optimal) first.

## Node.js

The [default HTML parser](https://www.npmjs.com/package/dom-parse) used only runs in browser environments. To run in Node.js you'll need to replace the HTML parser:

```js
import { parseFragment } from 'parse5';
…
renderMarkup(props.arbitraryHtml, { parser: parseFragment })
```
