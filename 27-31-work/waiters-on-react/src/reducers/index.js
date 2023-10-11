import { combineReducers } from 'redux';
import waitersReducer from './waiterReducer';

const rootReducer = combineReducers({
    waiters: waitersReducer,
});

export default rootReducer;