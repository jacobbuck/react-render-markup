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

test('throws TypeError if allowed property is not an array in object options', () => {
  expect(() => renderMarkup(null, { allowed: 'div' })).toThrow(
    new TypeError(
      'Expected property `allowed` to be of type `array` or `function` but received type `string` in object `options`'
    )
  );
});

test('throws TypeError if replace property is not an object in object options', () => {
  expect(() => renderMarkup(null, { replace: ['div'] })).toThrow(
    new TypeError(
      'Expected property `replace` to be of type `function` or `object` but received type `array` in object `options`'
    )
  );
});

test('throws TypeError if trim property is not an array in object options', () => {
  expect(() => renderMarkup(null, { trim: 1 })).toThrow(
    new TypeError(
      'Expected property `trim` to be of type `boolean` but received type `number` in object `options`'
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
