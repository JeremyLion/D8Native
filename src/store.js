import { createStore, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-community/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers/index';

/**
 * Configuring persist
 */
const persistConfig = {
    key: 'root',
    storage : AsyncStorage,
    whitelist: ['auth']
}

/**
 * Middlewares
 * @requires redux-thunk
 * @type {*[]}
 */
const middlewares = [ thunk ];

/**
 * Added debugger logger
 */
if(__DEV__) {
    middlewares.push(createLogger());
}

/**
 * Combine config and reducer in persistReducer
 * @type {Reducer<*, Action>}
 */
const persistedReducer = persistReducer(persistConfig, rootReducer);

/**
 * Creating store combining persistReducer and middlewares
 * @type {*}
 */
export const store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(...middlewares))
);

/**
 * Exporting persist with store config
 */
export const persistor = persistStore(store);