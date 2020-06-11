import htmlProps from './constants/htmlProps';
import svgProps from './constants/svgProps';
import { has } from './utilities';

const htmlAndSvgProps = [].concat(htmlProps, svgProps);

const specialAttrToPropMap = {
  class: 'className',
  for: 'htmlFor',
};

const attrToPropName = (attr) => {
  const attrName = attr.toLowerCase().replace(/[^a-z0-9]/g, '');

  if (has(attrName)(specialAttrToPropMap)) {
    return specialAttrToPropMap[attrName];
  }

  return htmlAndSvgProps.find((value) => value.toLowerCase() === attrName);
};

export default attrToPropName;
