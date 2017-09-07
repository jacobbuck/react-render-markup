'use strict';

var domParse = require('dom-parse');
var domToVdom = require('./dom-to-vdom');

module.exports = function(html, options) {
  options = options || {};
  var parser = options.parser || domParse;
  return domToVdom(parser(html, options.parserOptions))
};
