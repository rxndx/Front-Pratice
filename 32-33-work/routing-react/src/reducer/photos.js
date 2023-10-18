import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const photoSlice = createSlice({
    name: 'photos',
    initialState,
    reducers: {
        setPhotos: (state, action) => {
            return action.payload;
        },
    },
});

export const { setPhotos } = photoSlice.actions;
export default photoSlice.reducer;