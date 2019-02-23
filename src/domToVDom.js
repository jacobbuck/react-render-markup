import htmlVoidElements from 'html-void-elements';
import React from 'react';
import attrsToProps from './attrsToProps';
import { ELEMENT_NODE, TEXT_NODE } from './nodeTypes';

const domToVDom = (dom, options) => {
  const { replace = {} } = options;

  if (!dom || !dom.length) return null;

  const vdom = Array.from(dom)
    .filter(
      // Only allow element and text nodes
      node => node.nodeType === ELEMENT_NODE || node.nodeType === TEXT_NODE
    )
    .filter(
      // Disallow script element nodes
      node => node.nodeName.toLowerCase() !== 'script'
    )
    .map((node, i) => {
      // Render text nodes as string
      if (node.nodeType === TEXT_NODE) return node.textContent;

      const tagName = node.nodeName.toLowerCase();

      const props = attrsToProps(node.attributes);
      props.key = i;

      if (replace.hasOwnProperty(tagName)) {
        const replaceNodeType = replace[tagName];

        // Don't render falsey replacements
        if (!replaceNodeType) return null;

        return React.createElement(
          replaceNodeType,
          props,
          domToVDom(node.childNodes, options)
        );
      }

      return React.createElement(
        tagName,
        props,
        // Ignore children of HTML void elements
        htmlVoidElements.includes(tagName)
          ? null
          : domToVDom(node.childNodes, options)
      );
    })
    .filter(node => node != null);

  return vdom.length ? vdom : null;
};

export default domToVDom;
