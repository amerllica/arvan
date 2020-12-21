import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import { TextField } from '~/app/components';

const InputText = ({
  type,
  field: { value, name },
  form: { handleChange, handleBlur, handleFocus, errors = {} },
  ...rest
}) => (
  <TextField
    {...rest}
    name={name}
    onBlur={handleBlur}
    onFocus={handleFocus}
    onChange={handleChange}
    value={value}
    variant="outlined"
    type={type}
    error={!!errors[name]}
    helperText={errors[name] || ' '}
    {...(errors[name] ? { test: errors[name] } : {})}
  />
);

InputText.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }),
  form: PropTypes.shape({
    errors: PropTypes.object,
    handleBlur: PropTypes.func,
    handleChange: PropTypes.func,
    handleFocus: PropTypes.func,
  }),
  type: PropTypes.string,
};

InputText.defaultProps = {
  field: {},
  form: {},
  type: 'text',
};

export default props => <Field {...props} component={InputText} />;
