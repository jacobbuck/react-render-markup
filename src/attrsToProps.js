import cssToStyle from 'css-to-style';
import reactProps from './constants/reactProps';
import attrToPropName from './attrToPropName';
import { includes, startsWith, toArray } from './utilities';

const attrsToProps = (attrs) =>
  toArray(attrs)
    .filter(
      // Disallow event attributes and react props.
      ({ name }) => !startsWith(name, 'on') && !includes(reactProps, name)
    )
    .map(({ name, value }) => {
      // Don't modify aria-* or data-* attributes.
      if (startsWith(name, 'aria-') || startsWith(name, 'data-')) {
        return [name, value];
      }

      // Handle style attribute.
      if (name === 'style') {
        return [name, cssToStyle(value)];
      }

      return [attrToPropName(name) || name, value === '' ? true : value];
    })
    // Convert pairs to object.
    .reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});

export default attrsToProps;
