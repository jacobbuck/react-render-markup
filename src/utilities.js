// Checks if an array contains a value.
export const includes = (arr, search) =>
  Array.prototype.indexOf.call(arr, search) !== -1;

// Checks if a string starts with the characters of a specified string.
export const startsWith = (string, search) =>
  String.prototype.indexOf.call(string, search) === 0;
