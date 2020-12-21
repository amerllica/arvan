/* eslint-disable sort-keys-fix/sort-keys-fix */

// article actions
import {
  getArticlesList,
  failArticlesList,
  setArticlesList,
  revertFailArticlesList,
  GET_ARTICLES_LIST,
  FAIL_ARTICLES_LIST,
  SET_ARTICLES_LIST,
  REVERT_FAIL_ARTICLE_LIST,
} from './articles';
// login actions
import {
  sendLoginData,
  failLoginData,
  revertFailAction,
  successFulLogin,
  callLogout,
  SEND_LOGIN_DATA,
  FAIL_LOGIN_DATA,
  REVERT_FAIL_ACTION,
  SUCCESSFUL_LOGIN,
  CALL_LOGOUT,
} from './login';
// register actions
import {
  sendRegisterData,
  failRegisterData,
  revertFailAction as revertFailActionForRegister,
  SEND_REGISTER_DATA,
  FAIL_REGISTER_DATA,
  REVERT_FAIL_ACTION as REVERT_FAIL_ACTION_FOR_REGISTER,
} from './register';

export {
  // export article actions
  getArticlesList,
  failArticlesList,
  setArticlesList,
  revertFailArticlesList,
  GET_ARTICLES_LIST,
  FAIL_ARTICLES_LIST,
  SET_ARTICLES_LIST,
  REVERT_FAIL_ARTICLE_LIST,
  // export login actions
  sendLoginData,
  failLoginData,
  revertFailAction,
  successFulLogin,
  callLogout,
  SEND_LOGIN_DATA,
  FAIL_LOGIN_DATA,
  REVERT_FAIL_ACTION,
  SUCCESSFUL_LOGIN,
  CALL_LOGOUT,
  // export register actions
  sendRegisterData,
  revertFailActionForRegister,
  failRegisterData,
  SEND_REGISTER_DATA,
  FAIL_REGISTER_DATA,
  REVERT_FAIL_ACTION_FOR_REGISTER,
};
