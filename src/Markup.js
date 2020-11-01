import PropTypes from 'prop-types';
import * as React from 'react';
import renderMarkup from './renderMarkup';

const Markup = React.memo(function Markup({
  allowed = null,
  markup = null,
  replace = null,
  trim = null,
}) {
  return renderMarkup(markup, { allowed, replace, trim });
});

if (process.env.NODE_ENV !== 'production') {
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
}

export default Markup;
