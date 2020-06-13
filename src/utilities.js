// Checks if an object has an own property with the specified name.
export const has = (obj, name) =>
  Object.prototype.hasOwnProperty.call(obj, name);

// Checks if an array contains a value.
export const includes = (arr, search) => arr.indexOf(search) !== -1;

// Checks if the input value is null or undefined.
export const isNil = (value) => value == null;

// Checks if a string starts with the characters of a specified string.
export const startsWith = (string, search) => string.indexOf(search) === 0;

// Converts an array-like value into an array.
export const toArray = (value) => Array.prototype.slice.call(value);
