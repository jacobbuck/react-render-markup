import parseDom from 'dom-parse';
import isNil from './utilities/isNil';
import nodesToElements from './nodesToElements';

const renderMarkup = (markup, options = {}) => {
  if (process.env.NODE_ENV !== 'production') {
    if (typeof markup !== 'string' && !isNil(markup)) {
      throw new TypeError('Expected parameter "markup" to be a string.');
    }
    if (typeof options !== 'object') {
      throw new TypeError('Expected parameter "options" to be an object.');
    }
  }
  return isNil(markup) ? null : nodesToElements(parseDom(markup), options);
};

export default renderMarkup;
