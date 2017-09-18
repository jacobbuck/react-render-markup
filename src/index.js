import domParse from "dom-parse";
import domToVdom from "./dom-to-vdom";

const renderMarkup = (html, options) => domToVdom(domParse(html), options);

export default renderMarkup;
