import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reduxLogger from 'redux-logger';
import mySaga from './sagas';
import rootReducer from './reducers';

const defaultState = {};
const sagaMiddleware = createSagaMiddleware();
let middlewares = [sagaMiddleware];
if (process.env.NODE_ENV !== 'production') {
  middlewares.push(reduxLogger);
}

const store = createStore(rootReducer, defaultState, applyMiddleware(...middlewares));

sagaMiddleware.run(mySaga);

export default store;
