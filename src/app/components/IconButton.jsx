import React from 'react';
import PropTypes from 'prop-types';
import MuiIconButton from '@material-ui/core/IconButton';
import { withStyles, createStyles } from '~/utils/helpers';

const IconButton = ({ children, classes, label, ...rest }) => (
  <MuiIconButton
    {...rest}
    href={undefined}
    component="span"
    classes={{ root: classes.root }}
  >
    {children || label}
  </MuiIconButton>
);

IconButton.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.func,
    PropTypes.string,
    PropTypes.number,
  ]),
  classes: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  label: PropTypes.string,
};

IconButton.defaultProps = {
  children: undefined,
  label: undefined,
};

const styles = () =>
  createStyles({
    root: {
      textTransform: 'capitalize',
    },
  });

export default withStyles(styles)(IconButton);
