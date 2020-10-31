import htmlProps from './constants/htmlProps';
import svgProps from './constants/svgProps';

const propsLookup = new Map(
  [].concat(htmlProps, svgProps).map((value) => [value.toLowerCase(), value])
)
  .set('class', 'className')
  .set('for', 'htmlFor');

const attrToPropName = (attrName) => {
  const lowerAttrName = attrName.toLowerCase().replace(/[^a-z0-9]/g, '');
  return propsLookup.has(lowerAttrName)
    ? propsLookup.get(lowerAttrName)
    : attrName;
};

export default attrToPropName;
