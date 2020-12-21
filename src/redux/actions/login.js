/* eslint-disable sort-keys-fix/sort-keys-fix */
export const SEND_LOGIN_DATA = 'SEND_LOGIN_DATA';
export const REVERT_FAIL_ACTION = 'REVERT_FAIL_ACTION';
export const FAIL_LOGIN_DATA = 'FAIL_LOGIN_DATA';
export const SUCCESSFUL_LOGIN = 'SUCCESSFUL_LOGIN';
export const CALL_LOGOUT = 'CALL_LOGOUT';

export const sendLoginData = user => ({
  type: SEND_LOGIN_DATA,
  user,
});

export const revertFailAction = () => ({
  type: REVERT_FAIL_ACTION,
});

export const failLoginData = error => ({
  type: FAIL_LOGIN_DATA,
  error,
});

export const successFulLogin = profile => ({
  type: SUCCESSFUL_LOGIN,
  profile,
});

export const callLogout = () => ({
  type: CALL_LOGOUT,
});
