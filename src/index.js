import parseDom from 'dom-parse';
import nodesToElements from './nodesToElements';

const renderMarkup = (markup = '', options = {}) => {
  if (typeof markup !== 'string') {
    throw new TypeError('Expected parameter "markup" to be a string.');
  }
  if (typeof options !== 'object') {
    throw new TypeError('Expected parameter "options" to be an object.');
  }
  return nodesToElements(parseDom(markup), options);
};

export default renderMarkup;
