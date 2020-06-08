import has from '../utils/has';
import htmlProps from './htmlProps';
import svgProps from './svgProps';

const htmlAndSvgProps = [].concat(htmlProps, svgProps);

const specialAttrToPropMap = {
  class: 'className',
  for: 'htmlFor',
};

const attrToPropName = (attr) => {
  const attrName = attr.toLowerCase().replace(/[^a-z0-9]/g, '');

  if (has(attrName, specialAttrToPropMap)) {
    return specialAttrToPropMap[attrName];
  }

  return htmlAndSvgProps.find((value) => attrName === value.toLowerCase());
};

export default attrToPropName;
