import { has, isNil, includes, startsWith, toArray } from '../utilities';

describe('has', () => {
  test('checks if an object has an own property with the specified name', () => {
    const obj = { foo: 'bar' };
    expect(has(obj, 'foo')).toBe(true);
    expect(has(obj, 'bar')).toBe(false);
    expect(has(obj, 'toString')).toBe(false);
  });
});

describe('isNil', () => {
  test('returns true if the given value is `null` or `undefined`', () => {
    expect(isNil(null)).toBe(true);
    expect(isNil(undefined)).toBe(true);
  });

  test('returns false if the given value is not `null` or `undefined`', () => {
    [false, NaN, 0, '', [], {}, () => {}].forEach((value) => {
      expect(isNil(value)).toBe(false);
    });
  });
});

describe('includes', () => {
  test('checks if an array contains a value', () => {
    expect(includes(['foo', 'bar'], 'foo')).toBe(true);
    expect(includes(['foo', 'bar'], 'baz')).toBe(false);
  });
});

describe('startsWith', () => {
  test('checks if a string starts with the characters of a specified string', () => {
    expect(startsWith('foobar', 'foo')).toBe(true);
    expect(startsWith('foobar', 'bar')).toBe(false);
  });
});
