import parseDom from 'dom-parse';
import nodesToElements from './nodesToElements';
import { isNil } from './utilities';

const renderMarkup = (markup, options = {}) => {
  if (process.env.NODE_ENV !== 'production') {
    if (typeof markup !== 'string' && !isNil(markup)) {
      throw new TypeError(
        `Expected \`markup\` to be of type \`string\`, but received type \`${typeof markup}\``
      );
    }
    if (typeof options !== 'object') {
      throw new TypeError(
        `Expected \`options\` to be of type \`object\`, but received type \`${typeof options}\``
      );
    }
    if (!Array.isArray(options.allowed) && !isNil(options.allowed)) {
      throw new TypeError(
        `Expected property \`allowed\` to be of type \`array\` but received type \`${typeof options.allowed}\` in object \`options\``
      );
    }
    if (typeof options.replace !== 'object' && !isNil(options.replace)) {
      throw new TypeError(
        `Expected property \`replace\` to be of type \`object\` but received type \`${typeof options.replace}\` in object \`options\``
      );
    }
    if (typeof options.trim !== 'boolean' && !isNil(options.trim)) {
      throw new TypeError(
        `Expected property \`trim\` to be of type \`boolean\` but received type \`${typeof options.trim}\` in object \`options\``
      );
    }
  }
  return markup ? nodesToElements(parseDom(markup), options) : null;
};

export default renderMarkup;
