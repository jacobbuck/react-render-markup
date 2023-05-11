import { cloneElement, createElement, isValidElement } from 'react';
import { elementNode, textNode } from '../constants/nodeTypes';
import { getDisplayName } from '../utils/getDisplayName';
import { nodeNameToType } from '../utils/nodeNameToType';
import { attributesToProps } from './attributesToProps';

export const nodesToElements = (nodes, { allowed, replace, trim }) => {
  const walkNodes = (nodes) => {
    const tree = [];
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      // Only render element nodes and text nodes.
      if (node.nodeType === elementNode) {
        let type = nodeNameToType(node.nodeName);
        if (
          // Never render <script> elements.
          type === 'script' ||
          // Handle allowed option to only render elements that are allowed.
          (allowed &&
            (typeof allowed === 'function'
              ? !allowed(node)
              : !allowed.includes(type)))
        ) {
          continue;
        }
        // Handle replace option.
        if (replace) {
          const replacement =
            typeof replace === 'function'
              ? replace(node)
              : Object.hasOwn(replace, type)
              ? replace[type]
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
        const children = nodesToElements(node.childNodes);
        tree.push(
          isValidElement(type)
            ? cloneElement(type, props, children)
            : createElement(type, props, children)
        );
      } else if (node.nodeType === textNode) {
        // Handle trim option to remove whitespace text nodes.
        if (!trim || node.textContent.trim() !== '') {
          tree.push(node.textContent);
        }
      }
    }
    return tree.length > 0 ? tree : null;
  };
  return walkNodes(nodes);
};
