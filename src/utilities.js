// Checks if an object has an own property with the specified name.
export const has = (obj, name) =>
  Object.prototype.hasOwnProperty.call(obj, name);

// Checks if an array contains a value.
export const includes = (arr, search) =>
  Array.prototype.indexOf.call(arr, search) !== -1;

// Checks if the input value is null or undefined.
export const isNil = (value) => value == null;

// Checks if a string starts with the characters of a specified string.
export const startsWith = (string, search) =>
  String.prototype.indexOf.call(string, search) === 0;
