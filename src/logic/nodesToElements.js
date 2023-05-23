import { cloneElement, createElement, isValidElement } from 'react';
import { elementNode, textNode } from '../constants/nodeTypes';
import { getDisplayName } from '../utils/getDisplayName';
import { nodeNameToType } from '../utils/nodeNameToType';
import { attributesToProps } from './attributesToProps';

export const nodeToElement = (node, options, key = '') => {
  const { allowElements, blockElements, replaceElements, trim } = options;
  // Convert DOM Element to React Element
  if (node.nodeType === elementNode) {
    const ctx = {
      ref: node,
      type: nodeNameToType(node.nodeName),
      get children() {
        return (ctx.children = node.hasChildNodes()
          ? nodesToElements(node.childNodes, options)
          : null);
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
    // Filtering
    if (
      ctx.type === 'script' ||
      (allowElements && !allowElements.includes(ctx.type)) ||
      (blockElements && blockElements.includes(ctx.type))
    ) {
      return;
    }
    // Replacing
    if (replaceElements) {
      // Get replacement value by type or '*'
      const replacement = Object.hasOwn(replaceElements, ctx.type)
        ? replaceElements[ctx.type]
        : Object.hasOwn(replaceElements, '*')
        ? replaceElements['*']
        : undefined;
      if (typeof replacement === 'function') {
        const result = replacement(ctx);
        if (result !== undefined) {
          return isValidElement(result)
            ? cloneElement(result, {
                key: `${getDisplayName(result.type)}.${key}`,
              })
            : result;
        }
      } else if (typeof replacement === 'string') {
        ctx.type = replacement;
      } else if (isValidElement(replacement)) {
        ctx.props.key = `${getDisplayName(replacement.type)}.${key}`;
        return cloneElement(replacement, ctx.props, ctx.children);
      }
    }
    //
    ctx.props.key = `${getDisplayName(ctx.type)}.${key}`;
    return createElement(ctx.type, ctx.props, ctx.children);
  }
  //
  if (node.nodeType === textNode) {
    // Handle trim option to remove whitespace text nodes.
    if (!trim || node.textContent.trim() !== '') {
      return node.textContent;
    }
  }
};

export const nodesToElements = (nodes, options) => {
  const elements = [];
  for (let i = 0; i < nodes.length; i++) {
    const element = nodeToElement(nodes[i], options, i);
    if (element !== undefined) {
      elements.push(element);
    }
  }
  return elements;
};
