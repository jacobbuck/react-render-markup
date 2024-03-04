import { parse } from 'dom-parse';
import invariant from 'tiny-invariant';
import nodesToElements from './nodesToElements';

const renderMarkup = (markup, { allowed, replace, trim } = {}) => {
  invariant(
    markup == null || typeof markup === 'string',
    'Expected `markup` to be a string',
  );
  invariant(
    allowed == null || Array.isArray(allowed) || typeof allowed === 'function',
    'Expected `options.allowed` to be an array or function',
  );
  invariant(
    replace == null ||
      typeof replace === 'function' ||
      typeof replace === 'object',
    'Expected `options.replace` to be a function or object',
  );
  invariant(
    trim == null || typeof trim === 'boolean',
    'Expected `options.trim` to be a boolean',
  );
  return markup
    ? nodesToElements(parse(markup).childNodes, { allowed, replace, trim })
    : null;
};

export default renderMarkup;
