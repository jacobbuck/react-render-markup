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
    allowed: PropTypes.arrayOf(PropTypes.string),
    markup: PropTypes.string,
    replace: PropTypes.objectOf(PropTypes.elementType),
    trim: PropTypes.bool,
  };
}

export default Markup;
