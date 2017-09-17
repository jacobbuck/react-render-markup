import htmlProps from "./html-props";
import svgProps from "./svg-props";

const htmlAndSvgProps = [...htmlProps, svgProps];

const specialAttrToPropMap = {
  class: "className",
  for: "htmlFor",
};

const attrToPropName = attr => {
  const attrName = attr.toLowerCase().replace(/[^a-z]/g, "");
  let propName;

  if (specialAttrToPropMap.hasOwnProperty(attrName)) {
    propName = specialAttrToPropMap[attrName];
  } else {
    propName = htmlAndSvgProps.find(value => attrName === value.toLowerCase());
  }

  return propName || false;
};

export default attrToPropName;
