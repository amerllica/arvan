import {
  FAIL_REGISTER_DATA,
  REVERT_FAIL_ACTION_FOR_REGISTER,
} from '~/redux/actions';

const register = (state = {}, { type, error }) => {
  switch (type) {
    case FAIL_REGISTER_DATA:
      return {
        ...state,
        error: true,
        errorMessage: error,
      };
    case REVERT_FAIL_ACTION_FOR_REGISTER:
      return {
        ...state,
        error: undefined,
      };
    default:
      return state;
  }
};

export default register;
