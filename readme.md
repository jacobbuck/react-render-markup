# react-render-markup

Parse HTML, SVG and MathML into React elements.

## Example

```jsx
import renderMarkup from 'react-render-markup';
const MyComponent = props => <div>{renderMarkup(props.arbitraryHtml)}</div>;
```

## XSS

Only `<script>` tags and event attributes are disallowed. If you're parsing user inputed markup, you'll want to use some sort of [HTML sanitizer](https://www.npmjs.com/search?q=html%20sanitizer&page=1&ranking=optimal) first.
