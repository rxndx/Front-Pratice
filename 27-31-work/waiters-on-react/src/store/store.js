import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/index';
import { composeWithDevTools } from '@redux-devtools/extension';
import logger from 'redux-logger'
import thunk from 'redux-thunk'

export const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(logger, thunk)
    ),
);

export default store;