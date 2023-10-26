import { configureStore } from '@reduxjs/toolkit';
import generateSlice from '../store/reducer';
import {dishesUrl, ordersUrl, tablesUrl, waitersUrl} from '../api/url';

const tableSlice = generateSlice('tables', tablesUrl);
const waiterSlice = generateSlice('waiters', waitersUrl);
const dishesSlice = generateSlice('dishes', dishesUrl);
const ordersSlice = generateSlice('orders', ordersUrl);

export const store = configureStore({
    reducer: {
        tables: tableSlice.reducer,
        waiters: waiterSlice.reducer,
        dishes: dishesSlice.reducer,
        orders: ordersSlice.reducer,
    },
});