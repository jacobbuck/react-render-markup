// Returns a function that always returns the given value.
export const always = (value) => () => value;

export const cond = (pairs) => (...args) => {
  let i = 0;
  while (i < pairs.length) {
    const [predicate, transformer] = pairs[i];
    if (predicate(...args)) {
      return transformer(...args);
    }
    i += 1;
  }
};

// Checks if an object has an own property with the specified name
export const has = (obj, name) =>
  Object.prototype.hasOwnProperty.call(obj, name);

// Checks if the input value is null or undefined.
export const isNil = (value) => value == null;

// Checks if a string starts with the characters of a specified string.
export const startsWith = (string, search) => string.indexOf(search) === 0;

// Converts an array-like value into an array
export const toArray = (value) => Array.prototype.slice.call(value);
