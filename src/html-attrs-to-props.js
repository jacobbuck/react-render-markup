'use strict';

var cssToStyle = require('css-to-style');
var toArray = require('to-array');
var attrToPropName = require('./html-attr-to-prop-name')

module.exports = function attrsToProps(attrs) {
  return toArray(attrs).reduce(function(props, attr) {
    var name = attr.name;
    var value = attr.value;

    // Disallow event attributes
    if (name.substr(0, 2) === 'on') {
      return props;
    }

    var propName;
    if (['aria-', 'data-'].includes(name.substr(0, 5))) {
      propName = name;
    } else if ('style' === name) {
      propName = 'style';
      value = cssToStyle(value);
    } else {
      propName = attrToPropName(name);
    }

    if (propName) {
      props[propName] = value === '' ? true : value;
    }

    return props;
  }, {});
};
