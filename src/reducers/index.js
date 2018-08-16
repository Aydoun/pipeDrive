import { combineReducers } from 'redux';
import appReducer from './app';
import userReducer from './users';

const rootReducer = combineReducers({
  users : userReducer,
  app : appReducer,
});

export default rootReducer;
