import { createStore, applyMiddleware } from 'redux';
// Really nice for debugging our redux code
import logger from 'redux-logger';
// Allows our browser to cache/Store
import { persistStore } from 'redux-persist';

import createSagaMiddleware from 'redux-saga';

import rootReducer from './root-reducer';
import rootSaga from './root-saga';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

// Only log messages in Development Environment, Not in Production
if(process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

export default { store, persistor };