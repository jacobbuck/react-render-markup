import * as React from 'react';
import getDisplayName from 'react-display-name';
import { ELEMENT_NODE, TEXT_NODE } from './constants/nodeTypes';
import attrsToProps from './attrsToProps';
import { has, includes } from './utilities';

const nodesToElements = (nodeList, options) => {
  const tree = [];

  for (let i = 0; i < nodeList.length; i++) {
    const node = nodeList[i];

    // Handle text nodes.
    if (node.nodeType === TEXT_NODE) {
      // Handle trim option to remove whitespace text nodes.
      if (!options.trim || node.textContent.trim() !== '') {
        tree.push(node.textContent);
      }
      continue;
    }

    // Only render element (and text) nodes.
    if (
      node.nodeType !== ELEMENT_NODE ||
      // Never render <script> elements.
      node.nodeName.toLowerCase() === 'script' ||
      // Handle allowed option to only render elements that are allowed.
      (options.allowed &&
        !includes(options.allowed, node.nodeName.toLowerCase()))
    ) {
      continue;
    }

    let type = node.nodeName.toLowerCase();

    // Handle replace option.
    if (options.replace && has(options.replace, type)) {
      type = options.replace[type];

      // Don't render falsey replacements.
      if (!type) {
        continue;
      }
    }

    const props = attrsToProps(node.attributes);
    props.key = `${getDisplayName(type)}-${i}`;

    tree.push(
      React.createElement(
        type,
        props,
        nodesToElements(node.childNodes, options)
      )
    );
  }

  return tree.length > 0 ? tree : null;
};

export default nodesToElements;
