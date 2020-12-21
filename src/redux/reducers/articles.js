import { FAIL_ARTICLES_LIST, SET_ARTICLES_LIST } from '~/redux/actions';

const articlesList = (state = {}, { type, error, payload }) => {
  switch (type) {
    case SET_ARTICLES_LIST:
      return {
        ...state,
        ...payload,
      };
    case FAIL_ARTICLES_LIST:
      return {
        ...state,
        error: true,
        errorMessage: error,
      };
    default:
      return state;
  }
};

export default articlesList;
