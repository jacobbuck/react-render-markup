import cssToStyle from 'css-to-style';
import reactProps from './constants/reactProps';
import attrToPropName from './attrToPropName';
import { includes, startsWith } from './utilities';

const attrsToProps = (attrs) => {
  const props = {};

  for (let i = 0; i < attrs.length; i++) {
    const { name, value } = attrs[i];

    // Disallow event attributes and react props.
    if (startsWith(name, 'on') || includes(reactProps, name)) {
      continue;
    }

    // Don't modify aria-* or data-* attributes.
    if (startsWith(name, 'aria-') || startsWith(name, 'data-')) {
      props[name] = value;
      continue;
    }

    // Handle style attribute.
    if (name === 'style') {
      props[name] = cssToStyle(value);
      continue;
    }

    props[attrToPropName(name) || name] = value === '' ? true : value;
  }

  return props;
};

export default attrsToProps;
