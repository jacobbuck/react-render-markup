import domParse from "dom-parse";
import domToVdom from "./dom-to-vdom";

const renderMarkup = (html, { parser = domParse, ...options }) =>
  domToVdom(parser(html), options);

export default renderMarkup;
