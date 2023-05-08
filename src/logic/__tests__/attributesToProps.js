import { attributesToProps } from '../attrsToProps';

test('converts attributes to props', () => {
  const attrs = [
    { name: 'class', value: 'foo bar' },
    { name: 'id', value: 'baz' },
  ];
  expect(attrsToProps(attrs)).toEqual({
    className: 'foo bar',
    id: 'baz',
  });
});

test('handles aria and data attributes', () => {
  const attrs = [
    { name: 'aria-role', value: 'presentation' },
    { name: 'data-class', value: 'foo' },
  ];
  expect(attrsToProps(attrs)).toEqual({
    'aria-role': 'presentation',
    'data-class': 'foo',
  });
});

test('handles style attribute', () => {
  const attrs = [{ name: 'style', value: 'color: red; float: left' }];
  expect(attrsToProps(attrs)).toEqual({
    style: {
      color: 'red',
      cssFloat: 'left',
    },
  });
});

test('handles boolean attributes', () => {
  const attrs = [
    { name: 'checked', value: '' },
    { name: 'readonly', value: '' },
  ];
  expect(attrsToProps(attrs)).toEqual({
    checked: true,
    readOnly: true,
  });
});

test('filters react props', () => {
  const attrs = [
    { name: 'children', value: 'foo' },
    { name: 'key', value: 'bar' },
    { name: 'ref', value: 'baz' },
  ];
  expect(attrsToProps(attrs)).toEqual({});
});

test('filters event attributes', () => {
  const attrs = [
    { name: 'onclick', value: 'void 0' },
    { name: 'onError', value: 'alert("xss")' },
  ];
  expect(attrsToProps(attrs)).toEqual({});
});
