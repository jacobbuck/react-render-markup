// HTML elements are always in the canonical upper-case form,
// i.e. <h1> will have a tagName of "H1"
const isHTMLTagName = /^[A-Z]/;
const nodeNameToType = (nodeName) =>
  isHTMLTagName.test(nodeName) ? nodeName.toLowerCase() : nodeName;

export default nodeNameToType;
