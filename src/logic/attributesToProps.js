import cssToStyle from 'css-to-style';
import { standardProps } from '../constants/standardProps';
import { reactProps } from '../constants/reactProps';

export const attributesToProps = (attrs) => {
  const props = {};
  for (let i = 0; i < attrs.length; i++) {
    const { name, value } = attrs[i];
    // Disallow event attributes and react props.
    if (name.startsWith('on') || reactProps.includes(name)) {
      continue;
    }
    // Don't modify aria-* or data-* attributes.
    if (name.startsWith('aria-') || name.startsWith('data-')) {
      props[name] = value;
      continue;
    }
    // Handle style attribute.
    if (name === 'style') {
      props[name] = cssToStyle(value);
      continue;
    }
    props[standardProps.get(name) ?? name] = value === '' ? true : value;
  }
  return props;
};
