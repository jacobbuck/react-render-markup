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
        (options.allowed &&
          (typeof options.allowed === 'function'
            ? !options.allowed(node)
            : !options.allowed.includes(type)))
      ) {
        continue;
      }
      // Handle replace option.
      if (options.replace) {
        if (typeof options.replace === 'function') {
          const returnType = options.replace(node);
          // Returning undefined won't replace the type.
          if (returnType !== void 0) {
            type = returnType;
          }
        } else if (
          Object.prototype.hasOwnProperty.call(options.replace, type) &&
          options.replace[type] !== void 0
        ) {
          type = options.replace[type];
        }
        // Don't render nullish replacements.
        if (type == null) {
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
