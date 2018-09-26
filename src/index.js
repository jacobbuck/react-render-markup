import parseDom from './parse-dom';
import domToVdom from './dom-to-vdom';

const renderMarkup = (html, options = {}) => 
  html && typeof html === 'string'
    ? domToVdom(parseDom(html), options)
    : null;

export default renderMarkup;

