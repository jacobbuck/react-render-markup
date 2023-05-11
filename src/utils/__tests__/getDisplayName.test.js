import { getDisplayName } from '../getDisplayName';

test('returns passed value if string', () => {
  expect(getDisplayName('div')).toBe('div');
});

test('returns displayName property', () => {
  expect(getDisplayName({ displayName: 'Foo' })).toBe('Foo');
});

test('returns name property', () => {
  expect(getDisplayName({ name: 'Foo' })).toBe('Foo');
});

test('returns Unknown if unable to get display name', () => {
  expect(getDisplayName({})).toBe('Unknown');
});
