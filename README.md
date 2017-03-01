# react-render-markup

Parse HTML into React elements.

## Example

```js
import renderMarkup from 'react-render-markup';
const MyComponent = props => <div>{renderMarkup(props.arbitraryHtml)}</div>;
```

## Node.js

The [default HTML parser](https://www.npmjs.com/package/dom-parse) used only runs in Browser environments. To run in Node.js you'll need to replace the HTML parser:

```js
import { parseFragment } from 'parse5';
…
renderMarkup(props.arbitraryHtml, { parser: parseFragment })
```
