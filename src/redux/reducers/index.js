import { combineReducers } from 'redux';
import articles from './articles';
import login from './login';
import register from './register';

export default combineReducers({
  articles,
  login,
  register,
});
