import isNil from '../isNil';

test('returns true if the given value is `null` or `undefined`', () => {
  expect(isNil(null)).toBe(true);
  expect(isNil(undefined)).toBe(true);
});

test('returns false if the given value is not `null` or `undefined`', () => {
  [false, NaN, 0, '', [], {}, () => {}].forEach((value) => {
    expect(isNil(value)).toBe(false);
  });
});
