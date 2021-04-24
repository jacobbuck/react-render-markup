import parseDom from 'dom-parse';
import invariant from 'tiny-invariant';
import nodesToElements from './nodesToElements';

const renderMarkup = (markup, options) => {
  invariant(
    markup == null || typeof markup === 'string',
    'Expected `markup` to be a string'
  );
  invariant(
    options == null || typeof options === 'object',
    'Expected `options` to be an object'
  );
  invariant(
    options == null ||
      options.allowed == null ||
      Array.isArray(options.allowed) ||
      typeof options.allowed === 'function',
    'Expected `options.allowed` to be an array or function'
  );
  invariant(
    options == null ||
      options.replace == null ||
      typeof options.replace === 'function' ||
      typeof options.replace === 'object',
    'Expected `options.replace` to be a function or object'
  );
  invariant(
    options == null ||
      options.trim == null ||
      typeof options.trim === 'boolean',
    'Expected `options.trim` to be a boolean'
  );
  return markup ? nodesToElements(parseDom(markup), options ?? {}) : null;
};

export default renderMarkup;
