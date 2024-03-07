import TestRenderer from 'react-test-renderer';
import { expect, test } from 'vitest';
import htmlKitchenSink from './__fixtures__/htmlKitchenSink';
import svgScimitar from './__fixtures__/svgScimitar';
import { parse } from '../parse';

test('renders HTML from a string', () => {
  const testRenderer = TestRenderer.create(parse(htmlKitchenSink));
  expect(testRenderer.toJSON()).toMatchSnapshot();
});

test('renders SVG from a string', () => {
  const testRenderer = TestRenderer.create(parse(svgScimitar));
  expect(testRenderer.toJSON()).toMatchSnapshot();
});

test('returns null when markup is an empty string, null or undefined', () => {
  ['', null, undefined].forEach((value) => {
    expect(parse(value)).toBe(null);
  });
});

test('throws if markup is not a string', () => {
  expect(() => parse(false)).toThrow(
    new Error('Invariant failed: Expected `markup` to be a string'),
  );
});

test('throws if allowed property is not an array in object options', () => {
  expect(() => parse(null, { allowed: 'div' })).toThrow(
    new Error(
      'Invariant failed: Expected `options.allowed` to be an array or function',
    ),
  );
});

test('throws if replace property is not an object in object options', () => {
  expect(() => parse(null, { replace: 'div' })).toThrow(
    new Error(
      'Invariant failed: Expected `options.replace` to be a function or object',
    ),
  );
});

test('throws if trim property is not an array in object options', () => {
  expect(() => parse(null, { trim: 1 })).toThrow(
    new Error('Invariant failed: Expected `options.trim` to be a boolean'),
  );
});
