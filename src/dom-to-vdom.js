import htmlTagNames from "html-tag-names";
import svgTagNames from "html-tag-names";
import React from "react";
import attrsToProps from "./attrs-to-props";
import nodeTypes from "./node-types";

const htmlAndSvgTagNames = [...htmlTagNames, ...svgTagNames];

const domToVDom = (dom, options = {}) => {
  if (!dom || !dom.length) {
    return null;
  }

  const vdom = [...dom]
    .map((node, i) => {
      const { nodeName, nodeType } = node;

      // Only allow element and text nodes.
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

      const lowerNodeName = nodeName.toLowerCase();

      // Disallow script element nodes
      if (lowerNodeName === "script") {
        return null;
      }

      const props = attrsToProps(node.attributes);
      props.key = i;

      // Render HTML and SVG element nodes
      if (!htmlAndSvgTagNames.includes(lowerNodeName)) {
        return null;
      }

      return React.createElement(
        lowerNodeName,
        props,
        domToVDom(node.childNodes)
      );
    })
    .filter(node => node != null);

  return vdom.length ? vdom : null;
};

export default domToVDom;
