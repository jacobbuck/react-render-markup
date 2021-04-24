import TestRenderer from 'react-test-renderer';
import htmlKitchenSink from './__fixtures__/htmlKitchenSink';
import svgScimitar from './__fixtures__/svgScimitar';
import renderMarkup from '../renderMarkup';

test('renders HTML from a string', () => {
  const testRenderer = TestRenderer.create(renderMarkup(htmlKitchenSink));
  expect(testRenderer.toJSON()).toMatchSnapshot();
});

test('renders SVG from a string', () => {
  const testRenderer = TestRenderer.create(renderMarkup(svgScimitar));
  expect(testRenderer.toJSON()).toMatchSnapshot();
});

test('returns null when markup is an empty string, null or undefined', () => {
  expect(renderMarkup('')).toBe(null);
  expect(renderMarkup(null)).toBe(null);
  expect(renderMarkup()).toBe(null);
});

test('throws TypeError if markup is not a string', () => {
  expect(() => renderMarkup(false)).toThrow(
    new TypeError('Expected `markup` to be a string')
  );
});

test('throws TypeError if options is not an object', () => {
  expect(() => renderMarkup(null, () => {})).toThrow(
    new TypeError('Expected `options` to be an object')
  );
});

test('throws TypeError if allowed property is not an array in object options', () => {
  expect(() => renderMarkup(null, { allowed: 'div' })).toThrow(
    new TypeError('Expected `options.allowed` to be an array or function')
  );
});

test('throws TypeError if replace property is not an object in object options', () => {
  expect(() => renderMarkup(null, { replace: 'div' })).toThrow(
    new TypeError('Expected `options.replace` to be a function or object')
  );
});

test('throws TypeError if trim property is not an array in object options', () => {
  expect(() => renderMarkup(null, { trim: 1 })).toThrow(
    new TypeError('Expected `options.trim` to be a boolean')
  );
});

test('doesn’t typecheck in production', () => {
  const previousEnv = process.env;
  process.env = { ...previousEnv, NODE_ENV: 'production' };

  expect(() => renderMarkup(false)).not.toThrow(
    new TypeError('Expected `markup` to be a string')
  );
  expect(() => renderMarkup(null, () => {})).not.toThrow(
    new TypeError('Expected `options` to be an object')
  );

  process.env = previousEnv;
});
