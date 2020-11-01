import * as React from 'react';
import getDisplayName from 'react-display-name';
import { ELEMENT_NODE, TEXT_NODE } from './constants/nodeTypes';
import attrsToProps from './attrsToProps';
import nodeNameToType from './nodeNameToType';

const nodesToElements = (nodeList, options) => {
  const tree = [];
  for (let i = 0; i < nodeList.length; i++) {
    const node = nodeList[i];
    // Only render element nodes and text nodes.
    if (node.nodeType === ELEMENT_NODE) {
      let type = nodeNameToType(node.nodeName);
      if (
        // Never render <script> elements.
        type === 'script' ||
        // Handle allowed option to only render elements that are allowed.
        (options.allowed && options.allowed.includes(type))
      ) {
        continue;
      }
      // Handle replace option.
      if (
        options.replace &&
        Object.prototype.hasOwnProperty.call(options.replace, type)
      ) {
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
    } else if (node.nodeType === TEXT_NODE) {
      // Handle trim option to remove whitespace text nodes.
      if (!options.trim || node.textContent.trim() !== '') {
        tree.push(node.textContent);
      }
    }
  }
  return tree.length > 0 ? tree : null;
};

export default nodesToElements;
