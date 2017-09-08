import htmlTagNames from "html-tag-names";
import htmlVoidElements from "html-void-elements";
import React from "react";
import htmlAttrsToProps from "./html-attrs-to-props";
import htmlTagBlacklist from "./html-tag-blacklist";

const domToVDom = dom => {
  if (!dom || !dom.length) {
    return null;
  }

  const vdom = [...dom]
    .map((node, i) => {
      const nodeName = String(node.nodeName).toLowerCase();
      const nodeType = node.nodeType;

      // Return text nodes as string
      if (nodeType === 3) {
        return node.textContent;
      }

      // Only allow valid html elements. Disallow blacklisted html elements.
      if (
        nodeType !== 1 ||
        !htmlTagNames.includes(nodeName) ||
        htmlTagBlacklist.includes(nodeName)
      ) {
        return null;
      }

      const props = htmlAttrsToProps(node.attributes);
      props.key = i;

      return React.createElement(
        nodeName,
        props,
        htmlVoidElements.includes(nodeName) ? null : domToVDom(node.childNodes)
      );
    })
    .filter(node => node != null);

  if (!vdom.length) {
    return null;
  }

  return vdom;
};

export default domToVDom;
