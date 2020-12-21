import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, Grid, Typography } from '~/app/components';
import { createStyles, logout, readProfile, withStyles } from '~/utils/helpers';
import { headerHeight, sideBarWidth } from '~/utils/constants';
import { callLogout } from '~/redux/actions';

const BaseLayout = ({ children, classes, history, logoutApp }) => (
  <Grid className={classes.root}>
    <Grid className={classes.header}>
      <Typography variant="h6">Arvan Challenge</Typography>
      <span className={classes.welcome}>Welcome {readProfile('username')}</span>
      <Button
        classes={{ root: classes.logOutButton }}
        variant="outlined"
        color="primary"
        label="Logout"
        onClick={() => {
          logout(history.push);
          logoutApp();
        }}
      />
    </Grid>
    <Grid className={classes.sideBar}>Here will place Material UI Drawer</Grid>
    <Grid className={classes.main}>{children}</Grid>
  </Grid>
);

BaseLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.func,
    PropTypes.string,
  ]).isRequired,
  classes: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  logoutApp: PropTypes.func.isRequired,
};

const styles = ({ palette, spacing }) =>
  createStyles({
    header: {
      alignItems: 'center',
      backgroundColor: palette.background.darkGrey,
      color: palette.common.white,
      height: headerHeight,
      padding: [[0, spacing(2)]],
      width: '100%',
    },
    logOutButton: {
      marginLeft: 'auto',
    },
    main: {
      height: `calc(100% - ${headerHeight}px)`,
      overflow: 'hidden',
      width: `calc(100% - ${sideBarWidth}px)`,
    },
    root: {
      alignContent: 'flex-start',
      flexWrap: 'wrap',
      height: '100%',
    },
    sideBar: {
      backgroundColor: palette.primary.main,
      color: palette.common.white,
      height: `calc(100% - ${headerHeight}px)`,
      width: sideBarWidth,
    },
    welcome: {
      padding: [[0, spacing(1)]],
    },
  });

export default compose(
  withRouter,
  connect(
    undefined,
    dispatch => ({
      logoutApp: () => dispatch(callLogout()),
    })
  ),
  withStyles(styles)
)(BaseLayout);
