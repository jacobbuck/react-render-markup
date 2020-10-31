import { includes, startsWith } from '../utilities';

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
