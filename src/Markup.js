import { parse } from 'dom-parse';
import PropTypes from 'prop-types';
import * as React from 'react';
import nodesToElements from './nodesToElements';

const Markup = React.memo(({ allowed, markup, replace, trim }) =>
  markup
    ? nodesToElements(parse(markup).childNodes, { allowed, replace, trim })
    : null
);

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

export default Markup;
