import { put, takeLatest, call } from 'redux-saga/effects';
import {
  successFulLogin,
  failRegisterData,
  revertFailActionForRegister,
  SEND_REGISTER_DATA,
} from '~/redux/actions';
import { post } from '~/utils/api';
import url from '~/utils/api/urls';
import { writeProfile } from '~/utils/helpers';

function* sendRegisterDataSaga({ user }) {
  try {
    const { user: profile } = yield call(post, url.auth.register, { user });
    yield put(successFulLogin(profile));
    writeProfile(profile);
  } catch ({ errors }) {
    yield put(failRegisterData(errors));
    yield put(revertFailActionForRegister());
  }
}
export default [takeLatest(SEND_REGISTER_DATA, sendRegisterDataSaga)];
