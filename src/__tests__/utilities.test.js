import { always, cond, has, isNil, toArray } from '../utilities';

describe('always', () => {
  test('returns a function', () => {
    expect(typeof always(true)).toBe('function');
  });

  test('returns a function that always returns the given value ', () => {
    [null, true, 42, 'foo', [], {}, () => {}].forEach((value) => {
      expect(always(value)()).toBe(value);
    });
  });
});

describe('cond', () => {
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
});

describe('has', () => {
  test('checks if an object has an own property with the specified name', () => {
    const obj = { foo: 'bar' };
    expect(has('foo')(obj)).toBe(true);
    expect(has('bar')(obj)).toBe(false);
    expect(has('toString')(obj)).toBe(false);
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

describe('toArray', () => {
  test('returns an array', () => {
    expect(Array.isArray(toArray({ '0': 'foo', length: 1 }))).toBe(true);
  });

  test('converts an array-like value into an array', () => {
    expect(toArray({ '0': 'foo', length: 1 })).toStrictEqual(['foo']);
    expect(toArray(['foo'])).toStrictEqual(['foo']);
    expect(toArray('foo')).toStrictEqual(['f', 'o', 'o']);
  });

  test('converts a NodeList into an array', () => {
    const parent = document.createElement('div');
    const child1 = document.createElement('h1');
    const child2 = document.createElement('p');
    parent.append(child1);
    parent.append(child2);

    expect(toArray(parent.children)).toStrictEqual([child1, child2]);
  });

  test('converts a NamedNodeMap into an array', () => {
    const parent = document.createElement('div');
    const idAttr = document.createAttribute('id');
    const dataAttr = document.createAttribute('data-foo');
    idAttr.value = 'foo';
    dataAttr.value = 'bar';
    parent.setAttributeNode(idAttr);
    parent.setAttributeNode(dataAttr);

    expect(toArray(parent.attributes)).toStrictEqual([idAttr, dataAttr]);
  });
});
