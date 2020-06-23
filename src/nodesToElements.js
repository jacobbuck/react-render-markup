import * as React from 'react';
import { ELEMENT_NODE, TEXT_NODE } from './constants/nodeTypes';
import attrsToProps from './attrsToProps';
import { has, includes, isNil, toArray } from './utilities';

const nodesToElements = (nodeList, options) => {
  const tree = toArray(nodeList)
    .filter(
      (node) =>
        // Only render element and text nodes.
        (node.nodeType === ELEMENT_NODE &&
          // Never render <script> elements.
          node.nodeName.toLowerCase() !== 'script') ||
        (node.nodeType === TEXT_NODE &&
          // Handle trim option to remove whitespace text nodes.
          (options.trim !== true || node.textContent.trim() !== ''))
    )
    .map((node, i) => {
      // Handle text nodes.
      if (node.nodeType === TEXT_NODE) {
        return node.textContent;
      }

      let type = node.nodeName.toLowerCase();

      // Handle allowed option.
      if (!isNil(options.allowed) && !includes(options.allowed, type)) {
        // Don't render elements that aren't allowed.
        return null;
      }

      // Handle replace option.
      if (!isNil(options.replace) && has(options.replace, type)) {
        type = options.replace[type];

        // Don't render falsey replacements.
        if (!type) {
          return null;
        }
      }

      const props = attrsToProps(node.attributes);
      props.key = i;

      return React.createElement(
        type,
        props,
        nodesToElements(node.childNodes, options)
      );
    })
    .filter((node) => !isNil(node));

  return tree.length > 0 ? tree : null;
};

export default nodesToElements;
