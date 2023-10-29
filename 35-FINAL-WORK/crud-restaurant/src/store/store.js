import { configureStore } from '@reduxjs/toolkit';
import generateSlice from '../store/reducer';
import {dishesUrl, ordersUrl, tablesUrl, waitersUrl} from '../api/url';

export const tableSlice = generateSlice('tables', tablesUrl);
export const waiterSlice = generateSlice('waiters', waitersUrl);
export const dishesSlice = generateSlice('dishes', dishesUrl);
export const ordersSlice = generateSlice('orders', ordersUrl);

export const store = configureStore({
    reducer: {
        tables: tableSlice.reducer,
        waiters: waiterSlice.reducer,
        dishes: dishesSlice.reducer,
        orders: ordersSlice.reducer,
    },
});