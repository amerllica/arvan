/* eslint-disable sort-keys-fix/sort-keys-fix */
export const SEND_REGISTER_DATA = 'SEND_REGISTER_DATA';
export const REVERT_FAIL_ACTION = 'REVERT_FAIL_ACTION';
export const FAIL_REGISTER_DATA = 'FAIL_REGISTER_DATA';

export const sendRegisterData = user => ({
  type: SEND_REGISTER_DATA,
  user,
});

export const revertFailAction = () => ({
  type: REVERT_FAIL_ACTION,
});

export const failRegisterData = error => ({
  type: FAIL_REGISTER_DATA,
  error,
});
