import { createStore, applyMiddleware } from 'redux';
// Really nice for debugging our redux code
import logger from 'redux-logger';
// Allows our browser to cache/Store
import { persistStore } from 'redux-persist';

import rootReducer from './root-reducer';

const middlewares = [logger];

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

export const persistor = persistStore(store);

export default { store, persistor };