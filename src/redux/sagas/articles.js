import { put, takeLatest, call } from 'redux-saga/effects';
import {
  revertFailArticlesList,
  setArticlesList,
  failArticlesList,
  GET_ARTICLES_LIST,
} from '~/redux/actions';
import { getArticleDataPerPage } from '~/utils/api';

function* getArticlesListSaga({ perPage, pageNumber }) {
  try {
    const list = yield call(getArticleDataPerPage, perPage, pageNumber);
    const numericalList = { ...list, pageNumber };
    yield put(setArticlesList(numericalList));
  } catch ({ errors }) {
    yield put(failArticlesList(errors));
    yield put(revertFailArticlesList());
  }
}

export default takeLatest(GET_ARTICLES_LIST, getArticlesListSaga);
