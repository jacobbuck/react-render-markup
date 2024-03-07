import { expect, test } from 'vitest';
import { attributesToProps } from '../attributesToProps';

test('converts attributes to props', () => {
  const attrs = [
    { name: 'class', value: 'foo bar' },
    { name: 'id', value: 'baz' },
  ];
  expect(attributesToProps(attrs)).toEqual({
    className: 'foo bar',
    id: 'baz',
  });
});

test('handles aria and data attributes', () => {
  const attrs = [
    { name: 'aria-role', value: 'presentation' },
    { name: 'data-class', value: 'foo' },
  ];
  expect(attributesToProps(attrs)).toEqual({
    'aria-role': 'presentation',
    'data-class': 'foo',
  });
});

test('handles style attribute', () => {
  const attrs = [{ name: 'style', value: 'color: red; float: left' }];
  expect(attributesToProps(attrs)).toEqual({
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
  expect(attributesToProps(attrs)).toEqual({
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
  expect(attributesToProps(attrs)).toEqual({});
});

test('filters event attributes', () => {
  const attrs = [
    { name: 'onclick', value: 'void 0' },
    { name: 'onError', value: 'alert("xss")' },
  ];
  expect(attributesToProps(attrs)).toEqual({});
});
