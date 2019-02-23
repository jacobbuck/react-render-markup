import htmlTagNames from 'html-tag-names';
import htmlVoidElements from 'html-void-elements';
import mathMLTagNames from 'mathml-tag-names';
import svgTagNames from 'svg-tag-names';
import React from 'react';
import attrsToProps from './attrs-to-props';
import { ELEMENT_NODE, TEXT_NODE } from './node-types';

const allTagNames = [].concat(htmlTagNames, mathMLTagNames, svgTagNames);

const domToVDom = (dom, options) => {
  const { replace = {} } = options;

  if (!dom || !dom.length) {
    return null;
  }

  const vdom = Array.from(dom)
    .map((node, i) => {
      const { nodeName, nodeType } = node;

      // Only allow element and text nodes.
      if (nodeType !== ELEMENT_NODE && nodeType !== TEXT_NODE) {
        return null;
      }

      const lowerNodeName = nodeName.toLowerCase();

      // Disallow script element nodes
      if (lowerNodeName === 'script') {
        return null;
      }

      // Render text nodes as string
      if (nodeType === TEXT_NODE) {
        return node.textContent;
      }

      const props = attrsToProps(node.attributes);
      props.key = i;

      if (replace.hasOwnProperty(nodeName)) {
        const replaceNodeType = replace[nodeName];

        // Don't render falsey replacements
        if (!replaceNodeType) {
          return null;
        }

        return React.createElement(
          replaceNodeType,
          props,
          domToVDom(node.childNodes, options)
        );
      }

      // Render HTML, MathML and SVG elements
      if (allTagNames.includes(lowerNodeName)) {
        return React.createElement(
          lowerNodeName,
          props,
          // Ignore children of HTML void elements
          htmlVoidElements.includes(lowerNodeName)
            ? null
            : domToVDom(node.childNodes, options)
        );
      }

      return null;
    })
    .filter(node => node != null);

  return vdom.length ? vdom : null;
};

export default domToVDom;
