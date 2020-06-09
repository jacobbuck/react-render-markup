// Converts an array-like value into an array
const toArray = (value) => Array.prototype.slice.call(value);

export default toArray;
