import { createStore, combineReducers } from 'redux';

import Global from '../reducers/Global';
import Navigation from '../reducers/Navigation';
import User from '../reducers/User';

const appReducers = combineReducers({
    Global,
    Navigation,
    User
});

export default createStore(appReducers);