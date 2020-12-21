import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Home, Login, NotFound, Register } from '~/app/pages';
import routesNames from '~/utils/routesNames';

const { home, login, notFound, anythingElse, register } = routesNames;

const Routes = ({ isUserLogin }) =>
  isUserLogin ? (
    <Switch>
      <Route exact path={home} component={Home} />
      <Route path={notFound} component={NotFound} />
      <Redirect from={login} to={home} />
      <Redirect from={register} to={home} />
      <Redirect from={anythingElse} to={notFound} />
    </Switch>
  ) : (
    <Switch>
      <Route path={login} component={Login} />
      <Route path={register} component={Register} />
      <Redirect from={anythingElse} to={login} />
    </Switch>
  );

Routes.propTypes = {
  isUserLogin: PropTypes.bool,
};

Routes.defaultProps = {
  isUserLogin: false,
};

export default memo(Routes);
