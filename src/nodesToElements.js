import * as React from 'react';
import { ELEMENT_NODE, TEXT_NODE } from './constants/nodeTypes';
import attrsToProps from './attrsToProps';
import { always, cond, has, isNil, toArray } from './utilities';

const createElement = (
  node,
  i,
  options,
  type = node.nodeName.toLowerCase()
) => {
  const props = attrsToProps(node.attributes);
  props.key = i;

  return React.createElement(
    type,
    props,
    nodesToElements(node.childNodes, options)
  );
};

const processNode = cond([
  // Render text nodes as string
  [(node) => node.nodeType === TEXT_NODE, (node) => node.textContent],

  // Only allow element node types
  [(node) => node.nodeType !== ELEMENT_NODE, always(null)],

  // Disallow script element nodes
  [(node) => node.nodeName.toLowerCase() === 'script', always(null)],

  // Handle allowed option
  [
    (node, i, options) =>
      !isNil(options.allowed) &&
      options.allowed.includes(node.nodeName.toLowerCase()),
    always(null),
  ],

  // Handle replace option
  [
    (node, i, options) =>
      !isNil(options.replace) &&
      has(node.nodeName.toLowerCase())(options.replace),
    (node, i, options) => {
      const replaceNodeType = options.replace[node.nodeName.toLowerCase()];

      // Don't render falsey replacements
      if (!replaceNodeType) {
        return null;
      }

      return createElement(node, i, options, replaceNodeType);
    },
  ],

  // Render all other elements
  [always(true), createElement],
]);

const nodesToElements = (nodeList, options) =>
  toArray(nodeList)
    .map((node, i) => processNode(node, i, options))
    .filter((node) => !isNil(node));

export default nodesToElements;
