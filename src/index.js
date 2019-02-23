import parseDom from './parse-dom';
import domToVdom from './dom-to-vdom';

const renderMarkup = (markup = '', options = {}) => {
  if (typeof markup !== 'string') {
    throw new TypeError('Expected parameter "markup" to be a string.');
  }
  return domToVdom(parseDom(markup), options);
};

export default renderMarkup;
