import domParse from "dom-parse";
import domToVdom from "./dom-to-vdom";

const renderMarkup = (html, { parser = domParse, parserOptions, ...options }) =>
  domToVdom(parser(html, parserOptions), options);

export default renderMarkup;
