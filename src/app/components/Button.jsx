import React from 'react';
import PropTypes from 'prop-types';
import MuiButton from '@material-ui/core/Button';
import { withStyles, createStyles } from '~/utils/helpers';

const Button = ({ children, classes, fullWidth, label, ...rest }) => (
  <MuiButton
    {...rest}
    href={undefined}
    component="span"
    classes={{ root: classes.root }}
    {...(fullWidth ? { className: classes.fullWidth } : {})}
  >
    {children || label}
  </MuiButton>
);

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.func,
    PropTypes.string,
    PropTypes.number,
  ]),
  classes: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  fullWidth: PropTypes.bool,
  label: PropTypes.string,
};

Button.defaultProps = {
  children: undefined,
  fullWidth: undefined,
  label: undefined,
};

const styles = () =>
  createStyles({
    fullWidth: {
      width: '100%',
    },
    root: {
      textTransform: 'capitalize',
    },
  });

export default withStyles(styles)(Button);
