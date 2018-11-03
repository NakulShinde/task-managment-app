import {createStore, applyMiddleware} from 'redux';
import { createLogger } from 'redux-logger';

import allReducers from '../reducers/AllReducers';

const logger = createLogger();

const store = createStore(
    allReducers,
    applyMiddleware(logger)
);

export default store;