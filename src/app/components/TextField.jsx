import React from 'react';
import PropTypes from 'prop-types';
import { fade } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import HelperText from '@material-ui/core/FormHelperText';
import { createStyles, withStyles } from '~/utils/helpers';

const BootstrapTextField = withStyles(({ palette, transitions, spacing }) =>
  createStyles({
    input: {
      '&:focus': {
        borderColor: palette.primary.main,
        boxShadow: `${fade(palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      },
      backgroundColor: palette.common.white,
      border: '1px solid #ced4da',
      borderRadius: 4,
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      fontSize: 16,
      padding: '10px 12px',
      position: 'relative',
      transition: transitions.create(['border-color', 'box-shadow']),
      width: '100%',
    },
    root: {
      'label + &': {
        marginTop: spacing(3),
      },
    },
  })
)(InputBase);

const TextField = ({
  classes,
  label,
  name,
  type,
  helperText,
  error,
  ...rest
}) => (
  <FormControl className={classes.margin} component="span">
    <InputLabel
      shrink
      htmlFor={`${name}_${label}-${type}`}
      {...(error ? { className: classes.error } : {})}
    >
      {label}
    </InputLabel>
    <BootstrapTextField
      {...rest}
      name={name}
      type={type}
      id={`${name}_${label}-${type}`}
    />
    <HelperText {...(error ? { className: classes.error } : {})}>
      {helperText}
    </HelperText>
  </FormControl>
);

TextField.propTypes = {
  classes: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
};

TextField.defaultProps = {
  error: undefined,
  helperText: ' ',
  label: ' ',
  type: 'text',
};

const styles = ({ spacing, palette }) =>
  createStyles({
    error: {
      color: palette.error.main,
    },
    margin: {
      margin: [[spacing(1), 0]],
    },
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      margin: [[spacing(1), 0]],
    },
  });

export default withStyles(styles)(TextField);
