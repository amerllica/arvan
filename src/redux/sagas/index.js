/* eslint-disable sort-keys-fix/sort-keys-fix */
import '@babel/polyfill';
import { all } from 'redux-saga/effects';
import articles from './articles';
import login from './login';
import register from './register';

export default function* rootSaga() {
  yield all([articles, login, ...register]);
}
