import { createStore } from 'redux';
import waitersReducer from './waiterReducer';

const store = createStore(waitersReducer);

export default store;