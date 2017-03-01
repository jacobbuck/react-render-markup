'use strict';

module.exports = function kebabToCamelCase(value) {
  return value.replace(/\-\w/g, function(matches) {
    return matches[1].toUpperCase();
  });
};
