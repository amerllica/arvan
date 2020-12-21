import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form as FormikForm } from 'formik';

const Form = ({ render, children, className, ...rest }) => (
  <Formik
    {...rest}
    render={() => <FormikForm className={className}>{children}</FormikForm>}
  />
);

Form.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.func,
  ]).isRequired,
  className: PropTypes.string,
  render: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.func,
  ]),
};

Form.defaultProps = {
  className: undefined,
  render: undefined,
};

export default Form;
