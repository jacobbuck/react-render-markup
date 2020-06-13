import * as React from 'react';
import { ELEMENT_NODE, TEXT_NODE } from './constants/nodeTypes';
import attrsToProps from './attrsToProps';
import { has, isNil, toArray } from './utilities';

const nodesToElements = (nodeList, options) =>
  toArray(nodeList)
    .filter(
      ({ nodeName, nodeType }) =>
        (nodeType === ELEMENT_NODE && !nodeName.toLowerCase() !== 'script') ||
        nodeType === TEXT_NODE
    )
    .map((node, i) => {
      if (node.nodeType === TEXT_NODE) {
        return node.textContent;
      }

      let type = node.nodeName.toLowerCase();

      if (!isNil(options.allowed) && includes(options.allowed, type)) {
        return null;
      }

      // Handle replace option
      if (!isNil(options.replace) && has(options.replace, type)) {
        type = options.replace[type];

        // Don't render falsey replacements
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

export default nodesToElements;
