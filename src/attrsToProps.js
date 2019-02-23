import cssToStyle from 'css-to-style';
import attrToPropName from './attrToPropName';

const attrsToProps = attrs =>
  Array.from(attrs)
    .filter(
      // Disallow script element nodes
      attr => attr.name.substr(0, 2) !== 'on'
    )
    .reduce((props, attr) => {
      let { name, value } = attr;

      let propName;
      if (['aria-', 'data-'].includes(name.substr(0, 5))) {
        propName = name;
      } else if ('style' === name) {
        propName = 'style';
        value = cssToStyle(value);
      } else {
        propName = attrToPropName(name) || name;
      }

      props[propName] = value === '' ? true : value;

      return props;
    }, {});

export default attrsToProps;