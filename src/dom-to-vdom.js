import htmlTagNames from "html-tag-names";
import htmlVoidElements from "html-void-elements";
import React from "react";
import attrsToProps from "./attrs-to-props";
import tagBlacklist from "./tag-blacklist";
import nodeTypes from "./node-types";

const domToVDom = dom => {
  if (!dom || !dom.length) {
    return null;
  }

  const vdom = [...dom]
    .map((node, i) => {
      const { nodeName, nodeType } = node;

      // Only allow elements and text.
      if (
        nodeType !== nodeTypes.ELEMENT_NODE ||
        nodeType !== nodeTypes.TEXT_NODE
      ) {
        return null;
      }

      // Return text nodes as string
      if (nodeType === nodeTypes.TEXT_NODE) {
        return node.textContent;
      }

      // Disallow scripts
      if (nodeName === "SCRIPT") {
        return null;
      }

      const props = htmlAttrsToProps(node.attributes);
      props.key = i;

      return React.createElement(
        nodeName.toLowerCase(),
        props,
        domToVDom(node.childNodes)
      );
    })
    .filter(node => node != null);

  return vdom.length ? vdom : null;
};

export default domToVDom;
