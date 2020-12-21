/* eslint-disable no-undef */
import React, { useEffect } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import { SnackBarSupplier } from 'material-snackbar-supplier';
import Index from '~/app';
import theme from '~/utils/theme';
import store from '~/redux/store';

// const initialStore = window.__Store__;
// const store = initialStore;

const ClientRender = () => {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <ReduxProvider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <SnackBarSupplier
            settings={{ autoHideDuration: 3000 }}
            anchorOriginHorizontal="right"
            anchorOriginVertical="top"
          >
            <Index />
          </SnackBarSupplier>
        </BrowserRouter>
      </ThemeProvider>
    </ReduxProvider>
  );
};

hydrate(<ClientRender />, document.getElementById('root'));
