import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { parse } from './parse';

export const Markup = ({ markup, ...options }) =>
  useMemo(() => parse(markup, options), [markup]);

Markup.propTypes = {
  allowed: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.func,
  ]),
  markup: PropTypes.string,
  replace: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.objectOf(PropTypes.elementType),
  ]),
  trim: PropTypes.bool,
};
