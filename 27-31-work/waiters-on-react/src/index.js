import React from 'react';
import ReactDOM from 'react-dom/client';
import { Waiters } from './features/index'
import { Provider } from "react-redux";
import store from "./store/store";

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}><Waiters /></Provider>);