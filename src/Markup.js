import parseDom from 'dom-parse';
import PropTypes from 'prop-types';
import { memo } from 'react';
import { nodesToElements } from './logic/nodesToElements';

export const Markup = memo(function Markup({ allowed, markup, replace, trim }) {
  return markup
    ? nodesToElements(parseDom(markup), { allowed, replace, trim })
    : null;
});

Markup.propTypes /* remove-proptypes */ = {
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
