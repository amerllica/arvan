import { put, takeLatest, call } from 'redux-saga/effects';
import {
  successFulLogin,
  failLoginData,
  revertFailAction,
  SEND_LOGIN_DATA,
} from '~/redux/actions';
import { post } from '~/utils/api';
import url from '~/utils/api/urls';
import { writeProfile } from '~/utils/helpers';

function* sendLoginDataSaga({ user }) {
  try {
    const { user: profile } = yield call(post, url.auth.login, { user });
    yield put(successFulLogin(profile));
    writeProfile(profile);
  } catch ({ errors }) {
    yield put(failLoginData(errors));
    yield put(revertFailAction());
  }
}

export default takeLatest(SEND_LOGIN_DATA, sendLoginDataSaga);
