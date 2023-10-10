import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import UserList from './features/userList';
import AlbumList from './features/albumList';
import PhotoList from "./features/photoList";

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/users" element={<UserList />} />
                    <Route path="/albums/:userId" element={<AlbumList />} />
                    <Route path="/albums" element={<AlbumList />} />
                    <Route path="/albums/:userId/:albumId" element={<PhotoList />} />
                </Routes>
            </Router>
        </Provider>
    );
}

export default App;
