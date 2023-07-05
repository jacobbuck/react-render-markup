import getDisplayName from '../getDisplayName';

test('returns value if string', () => {
  expect(getDisplayName('div')).toBe('div');
});

test('returns value of displayName property', () => {
  expect(getDisplayName({ displayName: 'Foo' })).toBe('Foo');
});

test('returns value of name property', () => {
  expect(getDisplayName({ name: 'Foo' })).toBe('Foo');
});

test('returns display name of class', () => {
  class Foo {}
  expect(getDisplayName(Foo)).toBe('Foo');
});

test('returns display name of function', () => {
  const Foo = () => {};
  expect(getDisplayName(Foo)).toBe('Foo');
});

test('returns Unknown if unable to get display name', () => {
  [1, true, {}].forEach((v) => expect(getDisplayName(v)).toBe('Unknown'));
});
