// Checks if an object has an own property with the specified name
const has = (prop, obj) => Object.prototype.hasOwnProperty.call(obj, prop);

export default has;
