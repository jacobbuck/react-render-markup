import parseDom from './parseDom';
import domToVDom from './domToVDom';

const renderMarkup = (markup = '', options = {}) => {
  if (typeof markup !== 'string') {
    throw new TypeError('Expected parameter "markup" to be a string.');
  }
  if (typeof options !== 'object') {
    throw new TypeError('Expected parameter "options" to be an object.');
  }
  return domToVDom(parseDom(markup), options);
};

export default renderMarkup;
