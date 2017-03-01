'use strict';

var kebabToCamelCase = require('./kebab-to-camel-case');

module.exports = function styleToObject(value) {
  return value
    .split(';')
    .map(function(value) {
      return value
        .split(':')
        .map(function(value) { return value.trim(); });
    })
    .filter(function(value) {
      return value && value[0] && value[1];
    })
    .reduce(function(styles, value) {
      styles[kebabToCamelCase(value[0])] = value[1];
      return styles;
    }, {});
};
