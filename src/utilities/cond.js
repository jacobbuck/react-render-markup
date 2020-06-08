const cond = (pairs) => (...args) => {
  const matchedPair = pairs.find((pair) => pair[0](...args));
  if (typeof matchedPair !== 'undefined') {
    return matchedPair[1](...args);
  }
};

export default cond;
