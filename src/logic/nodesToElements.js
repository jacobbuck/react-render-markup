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
        const ctx = {
          ref: node,
          type: nodeNameToType(node.nodeName),
          get children() {
            return (ctx.children =
              node.hasChildNodes() && walkNodes(node.childNodes));
          },
          set children(value) {
            delete ctx.children;
            ctx.children = value;
          },
          get props() {
            return (ctx.props = attributesToProps(node.attributes));
          },
          set props(value) {
            delete ctx.props;
            ctx.props = value;
          },
        };
        if (
          // Never render <script> elements.
          ctx.type === 'script' ||
          // Handle allowed option to only render elements that are allowed.
          (allowed &&
            (typeof allowed === 'function'
              ? !allowed(ctx)
              : !allowed.includes(ctx.type)))
        ) {
          continue;
        }
        // Handle replace option.
        if (replace) {
          const replacement =
            typeof replace === 'function'
              ? replace(ctx)
              : Object.hasOwn(replace, ctx.type)
              ? replace[ctx.type]
              : undefined;
          // Don't render element if replacement is false or null.
          if (replacement === false || replacement === null) {
            continue;
          }
          // Replace element replacement—if not undefined.
          if (replacement !== undefined) {
            ctx.type = replacement;
          }
        }
        tree.push(
          (isValidElement(ctx.type) ? cloneElement : createElement)(
            ctx.type,
            { ...ctx.props, key: `${getDisplayName(ctx.type)}-${i}` },
            ctx.children
          )
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
