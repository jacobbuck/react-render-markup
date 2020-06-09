import toArray from '../toArray';

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
