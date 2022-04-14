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
        const replacement =
          typeof options.replace === 'function'
            ? options.replace(node)
            : Object.hasOwn(options.replace, type)
            ? options.replace[type]
            : undefined;
        // Don't render element if replacement is null.
        if (replacement === null) {
          continue;
        }
        // Replace element replacement—if not undefined.
        if (replacement !== undefined) {
          type = replacement;
        }
      }
      const props = attrsToProps(node.attributes);
      props.key = `${getDisplayName(type)}-${i}`;
      const children = nodesToElements(node.childNodes, options);
      tree.push(
        React.isValidElement(type)
          ? React.cloneElement(type, props, children)
          : React.createElement(type, props, children)
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
