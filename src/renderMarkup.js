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
  }
  return markup ? nodesToElements(parseDom(markup), options) : null;
};

export default renderMarkup;
