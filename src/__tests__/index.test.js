import TestRenderer from 'react-test-renderer';
import htmlKitchenSink from './__fixtures__/htmlKitchenSink';
import svgScimitar from './__fixtures__/svgScimitar';
import renderMarkup from '..';

test('renders HTML from a string', () => {
  const testRenderer = TestRenderer.create(renderMarkup(htmlKitchenSink));
  expect(testRenderer.toJSON()).toMatchSnapshot();
});

test('renders SVG from a string', () => {
  const testRenderer = TestRenderer.create(renderMarkup(svgScimitar));
  expect(testRenderer.toJSON()).toMatchSnapshot();
});

test('returns null when markup is null or undefined', () => {
  expect(renderMarkup(null)).toBe(null);
  expect(renderMarkup()).toBe(null);
});

test("throws an error when markup isn't a string", () => {
  expect(() => renderMarkup(false)).toThrow(
    TypeError('Expected parameter "markup" to be a string.')
  );
});

test("throws an error when options isn't an object", () => {
  expect(() => renderMarkup(null, () => {})).toThrow(
    new TypeError('Expected parameter "options" to be an object.')
  );
});

test("doesn't throw an error in production mode", () => {
  const previousEnv = process.env;
  process.env = { ...previousEnv, NODE_ENV: 'production' };

  expect(() => renderMarkup(false)).not.toThrow(
    TypeError('Expected parameter "markup" to be a string.')
  );
  expect(() => renderMarkup(null, () => {})).not.toThrow(
    new TypeError('Expected parameter "options" to be an object.')
  );

  process.env = previousEnv;
});
