import standardProps from './constants/standardProps';

const attrNameToPropName = (attrName) =>
  standardProps.get(attrName) ?? attrName;

export default attrNameToPropName;
