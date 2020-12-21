import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { withSnackBar } from 'material-snackbar-supplier';
import { Link } from 'react-router-dom';
import { withStyles, createStyles } from '~/utils/helpers';
import {
  Form,
  InputText,
  FormButton,
  Grid,
  Typography,
} from '~/app/components';
import { RegisterSchema } from '~/utils/validations';
import { sendRegisterData } from '~/redux/actions';
import routesNames from '~/utils/routesNames';
import { registerFailed, unknownError } from '~/utils/constants';

const Register = ({
  showSnackBar,
  classes,
  submitRegister,
  error,
  errorMessage,
}) => {
  useEffect(
    () =>
      error &&
      Object.entries(errorMessage || {}).forEach(err =>
        showSnackBar({
          message:
            (
              <span className={classes.snackBarErrorText}>
                <b>{registerFailed}</b>
                {` ${err[0]} ${err[1]}`}
              </span>
            ) || unknownError,
          variant: 'error',
        })
      ),
    [error]
  );
  return (
    <>
      <Helmet title="login" />
      <Grid container className={classes.container}>
        <Form
          initialValues={{
            email: '',
            password: '',
            username: '',
          }}
          validationSchema={RegisterSchema}
          onSubmit={submitRegister}
          // onSuccess={console.log}
          // onFailure={console.log}
          className={classes.form}
        >
          <Grid className={classes.inputWrapper}>
            <Typography
              variant="h4"
              align="center"
              className={classes.typography}
            >
              REGISTER
            </Typography>
            <InputText name="username" label="Username" type="text" />
            <InputText
              name="email"
              label="Email"
              placeholder="email@example.com"
              type="email"
            />
            <InputText name="password" label="Password" type="password" />
          </Grid>
          <Grid className={classes.buttonWrapper}>
            <FormButton fullWidth type="submit" label="register" />
            {/* <FormButton type="reset" label="reset" /> */}
          </Grid>
          <Grid>
            <Typography variant="h6" className={classes.loginHint}>
              <span>AlreadyRegistered? </span>
              <Link to={routesNames.login} className={classes.link}>
                Login
              </Link>
            </Typography>
          </Grid>
        </Form>
      </Grid>
    </>
  );
};

Register.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  error: PropTypes.bool,
  errorMessage: PropTypes.objectOf(PropTypes.string),
  showSnackBar: PropTypes.func.isRequired,
  submitRegister: PropTypes.func.isRequired,
};

Register.defaultProps = {
  error: undefined,
  errorMessage: {},
};

const styles = ({ palette, spacing, shape, typography }) =>
  createStyles({
    buttonWrapper: {
      justifyContent: 'space-between',
      marginTop: spacing(2),
    },
    container: {
      alignItems: 'center',
      flexDirection: 'column',
      flexGrow: 1,
      justifyContent: 'center',
    },
    form: {
      backgroundColor: palette.formBackground,
      borderRadius: shape.borderRadius,
      padding: spacing(2),
    },
    inputWrapper: {
      flexDirection: 'column',
      minHeight: spacing(20),
      width: spacing(50),
    },
    link: {
      color: palette.common.black,
      fontWeight: typography.fontWeightBold,
      textDecoration: 'none',
    },
    loginHint: {
      fontSize: typography.fontSize,
      marginTop: spacing(2),
    },
    snackBarErrorText: {
      color: palette.error.contrastText,
    },
    typography: {
      color: palette.formHeader,
      margin: [[spacing(4), 0]],
    },
  });

export default compose(
  memo,
  connect(
    ({ register: { error, errorMessage } = {} } = {}) => ({
      error,
      errorMessage,
    }),
    dispatch => ({ submitRegister: user => dispatch(sendRegisterData(user)) })
  ),
  withSnackBar,
  withStyles(styles)
)(Register);
