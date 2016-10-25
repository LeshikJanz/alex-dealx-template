import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import uiReducer from 'reducers/uiReducer';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  uiReducer,
  routing,
  form: formReducer,
});