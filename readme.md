# react-render-markup

Safely parse HTML, SVG and MathML into React elements.

## Example

```jsx
import renderMarkup from 'react-render-markup';

const MyComponent = (props) => <div>{renderMarkup(props.arbitraryHtml)}</div>;
```

## Usage

```js
renderMarkup(markup[, options])
```

### Parameters

- `markup` string of HTML you'd like to parse.
- `options` optional object of the following options:
  - `allowed` optional array of tag names to allow rendering.

    > :warning: Setting this option will strip all other elements from output.
  - `replace` optional object of elements to replace, the keys are tag names to replace and values are the type to replace with (either tag name string or a [React component](https://reactjs.org/docs/components-and-props.html) type.)

### Return value

An array of [React elements](https://reactjs.org/docs/rendering-elements.html).

## XSS

By default, `<script>` tags and event attributes (i.e. `onClick`) are disallowed and stripped from output.

If you're parsing user inputed markup, you'll want to use some sort of [HTML sanitizer](https://www.npmjs.com/search?q=html%20sanitizer&page=1&ranking=optimal) first.
