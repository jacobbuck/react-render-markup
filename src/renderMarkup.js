import parseDom from 'dom-parse';
import kindOf from 'kind-of';
import nodesToElements from './nodesToElements';
import { isNil } from './utilities';

const renderMarkup = (markup, options = {}) => {
  if (process.env.NODE_ENV !== 'production') {
    if (!isNil(markup) && kindOf(markup) !== 'string') {
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
    if (!isNil(options.allowed) && kindOf(options.allowed) !== 'array') {
      throw new TypeError(
        `Expected property \`allowed\` to be of type \`array\` but received type \`${kindOf(
          options.allowed
        )}\` in object \`options\``
      );
    }
    if (!isNil(options.replace) && kindOf(options.replace) !== 'object') {
      throw new TypeError(
        `Expected property \`replace\` to be of type \`object\` but received type \`${kindOf(
          options.replace
        )}\` in object \`options\``
      );
    }
    if (!isNil(options.trim) && kindOf(options.trim) !== 'boolean') {
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
