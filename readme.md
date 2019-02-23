# react-render-markup

Safely parse HTML, SVG and MathML into React elements.

## Example

```jsx
import renderMarkup from 'react-render-markup';
const MyComponent = props => <div>{renderMarkup(props.arbitraryHtml)}</div>;
```

## SSR

To use on Node.js, you'll need an implementation of DOMParser on `window` available. react-render-markup has been tested to work with both:

[jsdom](https://www.npmjs.com/package/jsdom):

```js
import { JSDOM } from 'jsdom';
const { window } = new JSDOM('<!DOCTYPE html>');
global.window = window;
```

[xmldom](https://www.npmjs.com/package/xmldom):

```js
import { DOMParser } from 'xmldom';
global.window = { DOMParser };
```

## XSS

Only `<script>` tags and event attributes (i.e. `onClick`) are disallowed.
If you're parsing user inputed markup, you'll want to use some sort of [HTML sanitizer](https://www.npmjs.com/search?q=html%20sanitizer&page=1&ranking=optimal) first.
