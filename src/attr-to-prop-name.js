import htmlProps from './html-props';
import svgProps from './svg-props';

const htmlAndSvgProps = [].concat(htmlProps, svgProps);

const specialAttrToPropMap = {
  class: 'className',
  for: 'htmlFor',
};

const attrToPropName = attr => {
  const attrName = attr.toLowerCase().replace(/[^a-z0-9]/g, '');

  if (specialAttrToPropMap.hasOwnProperty(attrName)) {
    return specialAttrToPropMap[attrName];
  }

  return htmlAndSvgProps.find(value => attrName === value.toLowerCase());
};

export default attrToPropName;
