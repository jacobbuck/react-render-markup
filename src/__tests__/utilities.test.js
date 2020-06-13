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
