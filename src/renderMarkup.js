import parseDom from 'dom-parse';
import kindOf from 'kind-of';
import nodesToElements from './nodesToElements';

const renderMarkup = (markup, options = {}) => {
  if (process.env.NODE_ENV !== 'production') {
    if (markup != null && kindOf(markup) !== 'string') {
      throw new TypeError(
        `Expected \`markup\` to be of type \`string\`, but received type \`${kindOf(
          markup
        )}\``
      );
    }
    if (kindOf(options) !== 'object') {
      throw new TypeError(
        `Expected \`options\` to be of type \`object\`, but received type \`${kindOf(
          options
        )}\``
      );
    }
    if (
      options.allowed != null &&
      !['array', 'function'].includes(kindOf(options.allowed))
    ) {
      throw new TypeError(
        `Expected property \`allowed\` to be of type \`array\` or \`function\` but received type \`${kindOf(
          options.allowed
        )}\` in object \`options\``
      );
    }
    if (
      options.replace != null &&
      !['function', 'object'].includes(kindOf(options.replace))
    ) {
      throw new TypeError(
        `Expected property \`replace\` to be of type \`function\` or \`object\` but received type \`${kindOf(
          options.replace
        )}\` in object \`options\``
      );
    }
    if (options.trim != null && kindOf(options.trim) !== 'boolean') {
      throw new TypeError(
        `Expected property \`trim\` to be of type \`boolean\` but received type \`${kindOf(
          options.trim
        )}\` in object \`options\``
      );
    }
  }
  return markup ? nodesToElements(parseDom(markup), options) : null;
};

export default renderMarkup;
