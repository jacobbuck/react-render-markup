import PropTypes from 'prop-types';
import React from 'react';
import renderMarkup from './renderMarkup';

const memo =
  typeof React.memo === 'function' ? React.memo : (component) => component;

const Markup = memo((props) => {
  const { allowed, markup, replace, trim } = props;
  return renderMarkup(markup, { allowed, replace, trim });
});

Markup.defaultProps = {
  allowed: null,
  markup: null,
  replace: null,
  trim: null,
};

Markup.propTypes = {
  allowed: PropTypes.arrayOf(PropTypes.string),
  markup: PropTypes.string,
  replace: PropTypes.objectOf(PropTypes.elementType),
  trim: PropTypes.bool,
};

export default Markup;
