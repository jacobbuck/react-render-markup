import htmlProps from "./html-props";

const specialAttrToPropMap = {
  class: "className",
  for: "htmlFor",
};

const attrToPropName = attr => {
  const attrName = attr.toLowerCase().replace(/[^a-z]/g, "");
  let propName;

  if (specialAttrToPropMap.hasOwnProperty(attrName)) {
    propName = specialAttrToPropMap[attrName];
  }

  propName = htmlProps.find(value => attrName === value.toLowerCase());

  return propName || false;
};

export default attrToPropName;
