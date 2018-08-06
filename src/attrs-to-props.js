import cssToStyle from 'css-to-style';
import attrToPropName from './attr-to-prop-name';

const attrsToProps = attrs =>
  [...attrs].reduce((props, attr) => {
    const name = attr.name;
    let value = attr.value;

    // Disallow event attributes
    if (name.substr(0, 2) === 'on') {
      return props;
    }

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
