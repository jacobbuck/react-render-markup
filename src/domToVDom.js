import React from 'react';
import attrsToProps from './attrsToProps';
import has from './utils/has';
import isNil from './utils/isNil';
import { ELEMENT_NODE, TEXT_NODE } from './nodeTypes';

const domToVDom = (nodeList, options) => {
  const { replace } = options;

  return Array.from(nodeList)
    .filter(
      // Only allow element and text nodes
      (node) => node.nodeType === ELEMENT_NODE || node.nodeType === TEXT_NODE
    )
    .filter(
      // Disallow script element nodes
      (node) => node.nodeName.toLowerCase() !== 'script'
    )
    .map((node, i) => {
      // Render text nodes as string
      if (node.nodeType === TEXT_NODE) return node.textContent;

      const tagName = node.nodeName.toLowerCase();

      const props = attrsToProps(node.attributes);
      props.key = i;

      if (isNil(replace) && replace.hasOwnProperty(tagName)) {
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
        domToVDom(node.childNodes, options)
      );
    })
    .filter((node) => node != null);
};

export default domToVDom;
