import cssToStyle from 'css-to-style';
import { booleanProps } from '../constants/booleanProps';
import { standardProps } from '../constants/standardProps';
import { reactProps } from '../constants/reactProps';

export const attributesToProps = (attrs) => {
  const props = {};
  for (let i = 0; i < attrs.length; i++) {
    let { name, value } = attrs[i];
    // Disallow event attributes and react props.
    if (name.startsWith('on') || reactProps.includes(name)) {
      continue;
    }
    // Get property name of HTML or SVG standard attributes
    if (Object.hasOwn(standardProps, name)) {
      name = standardProps[name];
    }
    // Handle `style` attribute
    if (name === 'style') {
      value = cssToStyle(value);
    }
    // Handle boolean attributes
    if (booleanProps.includes(name)) {
      value = true;
    }
    props[name] = value;
  }
  return props;
};
