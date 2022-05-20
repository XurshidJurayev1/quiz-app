import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducer as formReducer } from 'redux-form';
import { role, user } from './reducers/userRed';
import thunk from 'redux-thunk';
import { getCourses } from './reducers/adminRed';

const rootReducer = combineReducers({
  form: formReducer,
  user,
  role,
  getCourses,
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

