import parseDom from 'dom-parse';
import nodesToElements from './nodesToElements';

const renderMarkup = (markup, options = {}) => {
  if (process.env.NODE_ENV !== 'production') {
    if (markup != null && typeof markup !== 'string') {
      throw new TypeError('Expected `markup` to be a string');
    }
    if (typeof options !== 'object') {
      throw new TypeError('Expected `options` to be an object');
    }
    if (
      options.allowed != null &&
      !Array.isArray(options.allowed) &&
      typeof options.allowed !== 'function'
    ) {
      throw new TypeError(
        'Expected `options.allowed` to be an array or function'
      );
    }
    if (
      options.replace != null &&
      !['function', 'object'].includes(typeof options.replace)
    ) {
      throw new TypeError(
        'Expected `options.replace` to be a function or object'
      );
    }
    if (options.trim != null && typeof options.trim !== 'boolean') {
      throw new TypeError('Expected `options.trim` to be a boolean');
    }
  }
  return markup ? nodesToElements(parseDom(markup), options) : null;
};

export default renderMarkup;
