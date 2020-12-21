import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import Routes from '~/app/routes/Routes';
import { withStyles, readProfile } from '~/utils/helpers';
import globalStyles from '~/utils/globalStyles';

const Index = ({ userIsLogin }) => {
  const [isLogin, setLogin] = useState(false);
  useEffect(() => {
    const uil = !!readProfile('token');
    if (uil) {
      setLogin(true);
    }
  }, []);
  // eslint-disable-next-line
  useEffect(() => {
    const uil = !!readProfile('token');
    setLogin(uil);
  });
  return (
    <>
      <Helmet
        htmlAttributes={{ amp: undefined, lang: 'en' }}
        titleTemplate="%s | website.ir"
        titleAttributes={{ itemprop: 'name', lang: 'en' }}
        meta={[
          { content: 'website.ir', name: 'description' },
          { content: 'width=device-width, initial-scale=1', name: 'viewport' },
        ]}
        script={[
          { defer: undefined, src: '/assets/js/vendor.js' },
          { defer: undefined, src: '/assets/js/client.js' },
        ]}
      />
      <Routes isUserLogin={userIsLogin || isLogin} />
    </>
  );
};

Index.propTypes = {
  userIsLogin: PropTypes.bool,
};

Index.defaultProps = {
  userIsLogin: undefined,
};

export default compose(
  memo,
  connect(({ login: { userIsLogin } } = {}) => ({
    userIsLogin,
  })),
  withStyles(globalStyles)
)(Index);
