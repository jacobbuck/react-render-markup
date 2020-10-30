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

test('returns null when markup is null or undefined', () => {
  expect(renderMarkup(null)).toBe(null);
  expect(renderMarkup()).toBe(null);
});

test('throws TypeError if markup is not a string', () => {
  expect(() => renderMarkup(false)).toThrow(
    new TypeError(
      'Expected `markup` to be of type `string`, but received type `boolean`'
    )
  );
});

test('throws TypeError if options is not an object', () => {
  expect(() => renderMarkup(null, () => {})).toThrow(
    new TypeError(
      'Expected `options` to be of type `object`, but received type `function`'
    )
  );
});

test('doesn’t typecheck in production', () => {
  const previousEnv = process.env;
  process.env = { ...previousEnv, NODE_ENV: 'production' };

  expect(() => renderMarkup(false)).not.toThrow(
    new TypeError(
      'Expected `markup` to be of type `string`, but received type `boolean`'
    )
  );
  expect(() => renderMarkup(null, () => {})).not.toThrow(
    new TypeError(
      'Expected `options` to be of type `object`, but received type `function`'
    )
  );

  process.env = previousEnv;
});
