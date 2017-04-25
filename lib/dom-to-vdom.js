'use strict';

var htmlTagNames = require('html-tag-names');
var htmlVoidElements = require('html-void-elements');
var React = require('react');
var toArray = require('to-array');
var htmlAttrsToProps = require('./html-attrs-to-props')
var htmlTagBlacklist = require('./html-tag-blacklist');

module.exports = function domToVDom(dom) {
  if (!dom || !dom.length) {
    return null;
  }

  var vdom = toArray(dom)
    .map(function(node, i) {
      var nodeName = String(node.nodeName).toLowerCase();
      var nodeType = node.nodeType;

      // Return text nodes as string
      if (nodeType === Node.TEXT_NODE) {
        return node.textContent;
      }

      // Only allow valid html elements. Disallow blacklisted html elements.
      if (
        nodeType !== Node.ELEMENT_NODE ||
        !htmlTagNames.includes(nodeName) ||
        htmlTagBlacklist.includes(nodeName)
      ) {
        return null;
      }

      var props = htmlAttrsToProps(node.attributes);
      props.key = i;

      return React.createElement(
        nodeName,
        props,
        htmlVoidElements.includes(nodeName) ? null : domToVDom(node.childNodes)
      );
    })
    .filter(function (node) {
      return node;
    });

  if (!vdom.length) {
    return null;
  }

  return vdom;
};
