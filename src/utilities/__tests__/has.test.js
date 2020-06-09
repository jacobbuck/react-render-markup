import has from '../has';

test('checks if an object has an own property with the specified name', () => {
  const obj = { foo: 'bar' };
  expect(has('foo', obj)).toBe(true);
  expect(has('bar', obj)).toBe(false);
  expect(has('toString', obj)).toBe(false);
});
