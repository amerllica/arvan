import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { withSnackBar } from 'material-snackbar-supplier';
import { withStyles, createStyles } from '~/utils/helpers';
import {
  Form,
  InputText,
  FormButton,
  Grid,
  Typography,
} from '~/app/components';
import { LoginSchema } from '~/utils/validations';
import { sendLoginData } from '~/redux/actions';
import routesNames from '~/utils/routesNames';
import { unknownError, loginFailed } from '~/utils/constants';

const Login = ({ showSnackBar, classes, submitLogin, error, errorMessage }) => {
  useEffect(
    () =>
      error &&
      Object.entries(errorMessage || {}).forEach(err =>
        showSnackBar({
          message:
            (
              <span className={classes.snackBarErrorText}>
                <b>{loginFailed}</b>
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
          }}
          validationSchema={LoginSchema}
          onSubmit={submitLogin}
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
              LOGIN
            </Typography>
            <InputText
              name="email"
              label="Email"
              placeholder="email@example.com"
              type="email"
            />
            <InputText name="password" label="Password" type="password" />
          </Grid>
          <Grid className={classes.buttonWrapper}>
            <FormButton fullWidth type="submit" label="login" />
            {/* <FormButton type="reset" label="reset" /> */}
          </Grid>
          <Grid>
            <Typography variant="h6" className={classes.registerHint}>
              <span>Don’t have account? </span>
              <Link to={routesNames.register} className={classes.link}>
                Register Now
              </Link>
            </Typography>
          </Grid>
        </Form>
      </Grid>
    </>
  );
};

Login.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  error: PropTypes.bool,
  errorMessage: PropTypes.objectOf(PropTypes.string),
  showSnackBar: PropTypes.func.isRequired,
  submitLogin: PropTypes.func.isRequired,
};

Login.defaultProps = {
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
    registerHint: {
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
    ({ login: { error, errorMessage } = {} } = {}) => ({ error, errorMessage }),
    dispatch => ({ submitLogin: user => dispatch(sendLoginData(user)) })
  ),
  withSnackBar,
  withStyles(styles)
)(Login);
