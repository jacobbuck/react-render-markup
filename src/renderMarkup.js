import parseDom from 'dom-parse';
import nodesToElements from './nodesToElements';

const renderMarkup = (markup, options = {}) => {
  if (process.env.NODE_ENV !== 'production') {
    if (markup != null && typeof markup !== 'string') {
      throw new TypeError(
        `Expected \`markup\` to be of type \`string\`, but received type \`${typeof markup}\``
      );
    }
    if (typeof options !== 'object') {
      throw new TypeError(
        `Expected \`options\` to be of type \`object\`, but received type \`${typeof options}\``
      );
    }
    if (
      options.allowed != null &&
      !Array.isArray(options.allowed) &&
      typeof options.allowed !== 'function'
    ) {
      throw new TypeError(
        `Expected property \`allowed\` to be of type \`array\` or \`function\` but received type \`${typeof options.allowed}\` in object \`options\``
      );
    }
    if (
      options.replace != null &&
      !['function', 'object'].includes(typeof options.replace)
    ) {
      throw new TypeError(
        `Expected property \`replace\` to be of type \`function\` or \`object\` but received type \`${typeof options.replace}\` in object \`options\``
      );
    }
    if (options.trim != null && typeof options.trim !== 'boolean') {
      throw new TypeError(
        `Expected property \`trim\` to be of type \`boolean\` but received type \`${typeof options.trim}\` in object \`options\``
      );
    }
  }
  return markup ? nodesToElements(parseDom(markup), options) : null;
};

export default renderMarkup;
