import { combineReducers } from 'redux';
import user from './user';
import assessment from './assessment';
import tab from './tab';

const rootReducer = combineReducers({
  user, assessment, tab
});

export default rootReducer;
