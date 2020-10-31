# react-render-markup

Safely parse HTML, SVG and MathML into React elements.

- :gift: Lightweight ![npm bundle size](https://badgen.net/bundlephobia/minzip/react-render-markup)
- :smile: Easy to use with simple API
- :printer: Server-side rendering out of the box

## Usage

### `Markup` component

```js
import { Markup } from 'react-render-markup';

<Markup [...props] />
```

#### Props

- `allowed` array of tag names to allow rendering.

  > :warning: Setting this option will strip all other elements from output.

- `markup` string of HTML you’d like to parse.
- `replace` object of elements to replace.

  The keys are tag names to replace and values are the type to replace with (either tag name string or a [React component](https://reactjs.org/docs/components-and-props.html) type.)

- `trim` boolean removes whitespace text nodes when `true`.

### `renderMarkup` function

```js
import { renderMarkup } from 'react-render-markup';

renderMarkup(markup[, options])
```

#### Parameters

- `markup` string of HTML you’d like to parse.
- `options` optional object of the following options:

  - `allowed` array of tag names to allow rendering.

    > :warning: Setting this option will strip all other elements from output.

  - `replace` object of elements to replace.

    The keys are tag names to replace and values are the type to replace with (either tag name string or a [React component](https://reactjs.org/docs/components-and-props.html) type.)

  - `trim` boolean removes whitespace text nodes when `true`.

#### Return value

An array of [React elements](https://reactjs.org/docs/rendering-elements.html).

## Examples

### Basic

```jsx
const MyComponent = (props) => {
  const { content } = props;
  return (
    <div>
      <Markup markup={content} />
    </div>
  );
};
```

or

```jsx
const MyComponent = (props) => {
  const { content } = props;
  return <div>{renderMarkup(content)}</div>;
};
```

### With `allowed` option

```jsx
const allowed = ['strong', 'em']; // strips all other elements

const MyComponent = (props) => {
  const { content } = props;
  return (
    <div>
      <Markup allowed={allowed} markup={content} />
    </div>
  );
};
```

or

```jsx
const MyComponent = (props) => {
  const { content } = props;
  return (
    <div>
      {renderMarkup(content, {
        allowed: ['strong', 'em'],
      })}
    </div>
  );
};
```

### With `replace` option

```jsx
import { Link } from 'some-router-library';

const replace = {
  a: Link, // replace <a> elements with <Link> component
  em: 'strong', // replace <em> elements with <strong> elements
  img: null, // doesn’t render <img> elements
  span: React.Fragment, // unwraps contents of <span> elements
};

const MyComponent = (props) => {
  const { content } = props;
  return (
    <div>
      <Markup markup={content} replace={replace} />
    </div>
  );
};
```

or

```jsx
import { Link } from 'some-router-library';

const MyComponent = (props) => {
  const { content } = props;
  return (
    <div>
      {renderMarkup(content, {
        replace: {
          a: Link,
          em: 'strong',
          img: null,
          span: React.Fragment,
        },
      })}
    </div>
  );
};
```

## Cross Site Scripting (XSS)

By default, `<script>` tags and event attributes (i.e. `onClick`) are disallowed and stripped from output.

If you’re parsing user inputed markup, you’ll want to use some sort of [HTML sanitizer](https://www.npmjs.com/search?q=html%20sanitizer&page=1&ranking=optimal) first.
