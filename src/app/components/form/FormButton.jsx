import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import { Button } from '~/app/components';

const submitButtonType = {
  reset: 'handleReset',
  submit: 'handleSubmit',
};

const FormButton = ({
  disableAfterSubmit,
  type,
  label,
  form: {
    dirty,
    isSubmitting,
    [submitButtonType[type]]: handleClick,
    errors = {},
  },
  ...rest
}) => {
  const isTypeSubmit = type === 'submit';

  return (
    <Button
      {...rest}
      name={type}
      onClick={handleClick}
      disabled={
        !dirty ||
        (disableAfterSubmit && isTypeSubmit && isSubmitting) ||
        (isTypeSubmit && Object.keys(errors).length > 0)
      }
      color="primary"
      variant={isTypeSubmit ? 'contained' : 'outlined'}
    >
      {label}
    </Button>
  );
};

FormButton.propTypes = {
  disableAfterSubmit: PropTypes.bool,
  form: PropTypes.shape({
    dirty: PropTypes.bool,
    errors: PropTypes.object,
    isSubmitting: PropTypes.bool,
  }),
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['submit', 'reset']),
};

FormButton.defaultProps = {
  disableAfterSubmit: undefined,
  form: {},
  type: 'submit',
};

export default props => <Field {...props} component={FormButton} />;
