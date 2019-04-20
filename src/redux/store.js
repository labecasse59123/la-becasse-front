import {
  createStore,
  applyMiddleware,
  compose,
} from 'redux';

import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { responsiveStoreEnhancer } from 'redux-responsive';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './rootReducer';

// Do not refactor this into !['production', 'test'].includes(process.env.NODE_ENV)
// Because uglify cannot statically analyze this.
const isDevEnvironment = (
  process.env.NODE_ENV !== 'production'
  && process.env.NODE_ENV !== 'test'
);

const middlewares = [
  thunk,
];

if (isDevEnvironment) {
  middlewares.push(createLogger({
    collapsed: true,
    diff: true,
    duration: true,
  }));
}

const composer = isDevEnvironment ? composeWithDevTools : compose;

const enhancers = composer(
  responsiveStoreEnhancer,
  applyMiddleware(...middlewares),
);

const initialState = {};

export default createStore(rootReducer, initialState, enhancers);
