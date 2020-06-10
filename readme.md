# react-render-markup

Safely parse HTML, SVG and MathML into React elements.

## Usage

```js
import renderMarkup from 'react-render-markup';

renderMarkup(markup[, options])
```

### Parameters

- `markup` string of HTML you’d like to parse.
- `options` optional object of the following options:
- `options.allowed` optional array of tag names to allow rendering.

  > :warning: Setting this option will strip all other elements from output.

- `options.replace` optional object of elements to replace.

  The keys are tag names to replace and values are the type to replace with (either tag name string or a [React component](https://reactjs.org/docs/components-and-props.html) type.)

### Return value

An array of [React elements](https://reactjs.org/docs/rendering-elements.html).

## Examples

### Basic

```jsx
const MyComponent = (props) => <div>{renderMarkup(props.content)}</div>;
```

### With `allowed` option

```jsx
const MyComponent = (props) => (
  <div>
    {renderMarkup(props.content, {
      allowed: ['strong', 'em'], // strips all other elements
    })}
  </div>
);
```

### With `replace` option

```jsx
import { Link } from 'some-router-library';

const MyComponent = (props) => (
  <div>
    {renderMarkup(props.content, {
      replace: {
        a: Link, // replace <a> elements with <Link> component
        em: 'strong', // replace <em> elements with <strong> elements
        img: null, // doesn’t render <img> elements
      },
    })}
  </div>
);
```

## XSS

By default, `<script>` tags and event attributes (i.e. `onClick`) are disallowed and stripped from output.

If you’re parsing user inputed markup, you’ll want to use some sort of [HTML sanitizer](https://www.npmjs.com/search?q=html%20sanitizer&page=1&ranking=optimal) first.
