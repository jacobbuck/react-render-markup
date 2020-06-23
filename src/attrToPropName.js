import htmlProps from './constants/htmlProps';
import svgProps from './constants/svgProps';

const htmlAndSvgProps = [].concat(htmlProps, svgProps);

const attrToPropName = (attr) => {
  const lowerAttr = attr.toLowerCase().replace(/[^a-z0-9]/g, '');

  // Handle special exceptions.
  if (lowerAttr === 'class') {
    return 'className';
  }
  if (lowerAttr === 'for') {
    return 'htmlFor';
  }

  return htmlAndSvgProps.find((value) => value.toLowerCase() === lowerAttr);
};

export default attrToPropName;
