import always from '../always';

test('returns a function', () => {
  expect(typeof always(true)).toBe('function');
});

test('returns a function that always returns the given value ', () => {
  [null, true, 42, 'foo', [], {}, () => {}].forEach((value) => {
    expect(always(value)()).toBe(value);
  });
});
