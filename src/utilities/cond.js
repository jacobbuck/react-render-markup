const cond = (pairs) => (...args) => {
  let i = 0;
  while (i < pairs.length) {
    const [predicate, transformer] = pairs[i];
    if (predicate(...args)) {
      return transformer(...args);
    }
    i += 1;
  }
};

export default cond;
