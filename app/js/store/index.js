import { createStore, applyMiddleware, combineReducers } from 'redux';

import { createLogger } from 'redux-logger';

import Global from '../reducers/Global';
import Navigation from '../reducers/Navigation';
import User from '../reducers/User';

const logger = createLogger();

const appReducers = combineReducers({
    Global,
    Navigation,
    User
});

export default createStore(
    appReducers,
    applyMiddleware(logger)
);