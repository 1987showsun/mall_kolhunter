import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import reducer from './reducers';

export default (preloadedState) => {
  return createStore(reducer, preloadedState, applyMiddleware(thunk, createLogger()));
};
