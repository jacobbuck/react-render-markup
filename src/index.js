import parseDom from './parse-dom';
import domToVdom from './dom-to-vdom';

const renderMarkup = (html, options = {}) => domToVdom(parseDom(html), options);

export default renderMarkup;
