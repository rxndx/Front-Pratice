import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const albumSlice = createSlice({
    name: 'albums',
    initialState,
    reducers: {
        setAlbums: (state, action) => {
            return action.payload;
        },
    },
});

export const { setAlbums } = albumSlice.actions;
export default albumSlice.reducer;