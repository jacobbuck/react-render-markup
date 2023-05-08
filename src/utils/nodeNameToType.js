// HTML elements are always in the canonical upper-case form,
// i.e. <h1> will have a tagName of "H1"
const isHTMLTagName = /^[A-Z]+[0-9]?$/;

export const nodeNameToType = (nodeName) =>
  isHTMLTagName.test(nodeName) ? nodeName.toLowerCase() : nodeName;
