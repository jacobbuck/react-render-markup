import cond from '../cond';

test('returns a function', () => {
  expect(typeof cond([])).toBe('function');
});

test('returns a conditional function', function () {
  const fn = cond([
    [(value) => value === 0, () => 'water freezes at 0°C'],
    [(value) => value === 100, () => 'water boils at 100°C'],
    [() => true, (value) => `nothing special happens at ${value}°C`],
  ]);

  expect(fn(0)).toBe('water freezes at 0°C');
  expect(fn(100)).toBe('water boils at 100°C');
  expect(fn(50)).toBe('nothing special happens at 50°C');
});
