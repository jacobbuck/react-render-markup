'use strict'

var htmlProps = require('./html-props');

var specialAttrToPropMap = {
  'class': 'className',
  'for': 'htmlFor',
};

module.exports = function attrToPropName(attrName) {
  attrName = attrName.toLowerCase().replace(/[^a-z]/g, '');
  var propName;

  if (specialAttrToPropMap.hasOwnProperty(attrName)) {
    propName = specialAttrToPropMap[attrName];
  }

  propName = htmlProps.find(function(value) {
    return attrName === value.toLowerCase();
  });

  return propName ? propName : false;
};
