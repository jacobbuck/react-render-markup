import domParse from 'dom-parse';
import domToVdom from './dom-to-vdom';

const renderMarkup = (html, options = {}) => {
  const parser = options.parser || domParse;
  return domToVdom(parser(html, options.parserOptions))
}

export default renderMarkup;
