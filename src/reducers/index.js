import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

const mainReducer = (state = {
}, action) => {
  return state;
};

const rootReducer = combineReducers({
  mainReducer,
  form: formReducer
});

export default rootReducer;

