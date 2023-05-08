import { cloneElement, createElement, isValidElement } from 'react';
import getDisplayName from 'react-display-name';
import { elementNode, textNode } from '../constants/nodeTypes';
import { nodeNameToType } from '../utils/nodeNameToType';
import { attributesToProps } from './attributesToProps';

export const nodesToElements = (nodeList, options) => {
  const tree = [];
  for (let i = 0; i < nodeList.length; i++) {
    const node = nodeList[i];
    // Only render element nodes and text nodes.
    if (node.nodeType === elementNode) {
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
        // Don't render element if replacement is false or null.
        if (replacement === false || replacement === null) {
          continue;
        }
        // Replace element replacement—if not undefined.
        if (replacement !== undefined) {
          type = replacement;
        }
      }
      const props = attributesToProps(node.attributes);
      props.key = `${getDisplayName(type)}-${i}`;
      const children = nodesToElements(node.childNodes, options);
      tree.push(
        isValidElement(type)
          ? cloneElement(type, props, children)
          : createElement(type, props, children)
      );
    } else if (node.nodeType === textNode) {
      // Handle trim option to remove whitespace text nodes.
      if (!options.trim || node.textContent.trim() !== '') {
        tree.push(node.textContent);
      }
    }
  }
  return tree.length > 0 ? tree : null;
};
