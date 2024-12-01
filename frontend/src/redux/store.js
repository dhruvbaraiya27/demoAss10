// src/redux/store.js
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';  // Change this import
import authReducer from './reducers/authReducer';
import userReducer from './reducers/userReducer';
import jobReducer from './reducers/jobReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  users: userReducer,
  jobs: jobReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;