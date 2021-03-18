/**
 * Configure Redux Store
 */
import { createStore, compose, applyMiddleware } from 'redux';
import { DevTools } from 'topcoder-react-utils';
import { createPromise } from 'redux-promise-middleware';
import root from './reducers';

const middlewares = [
  createPromise({ promiseTypeSuffixes: ['INIT', 'DONE', 'FAILURE'] }),
];

if (process.env.NODE_ENV === 'development') {
  const logger = require('redux-logger').createLogger(); // eslint-disable-line global-require
  middlewares.push(logger);
}

export default createStore(
  root,
  compose(applyMiddleware(...middlewares), DevTools.instrument()),
);
