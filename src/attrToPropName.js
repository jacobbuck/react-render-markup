import htmlProps from './constants/htmlProps';
import svgProps from './constants/svgProps';

const propsLookup = [].concat(htmlProps, svgProps).reduce((acc, value) => {
  acc[value.toLowerCase()] = value;
  return acc;
}, {});

const attrToPropName = (attrName) => {
  const lowerAttrName = attrName.toLowerCase().replace(/[^a-z0-9]/g, '');

  // Handle special exceptions.
  if (lowerAttrName === 'class') {
    return 'className';
  }
  if (lowerAttrName === 'for') {
    return 'htmlFor';
  }

  return propsLookup[lowerAttrName];
};

export default attrToPropName;
