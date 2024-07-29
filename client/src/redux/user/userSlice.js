import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    error: null,
    loading: false,
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        signInSuccess: (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
            state.error = null;
        },
        signInFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;   
        },
        updateStart: (state) => {
            state.loading = true;
        },
        updateSuccess: (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
        },
        updateFailure: (state) => {
            state.loading = false;
        },
        signOut: (state) => {
            state.loading = false;
            state.currentUser = null;
            state.error = null;
        },
    },
});

export const { signInStart, signInSuccess, signInFailure, signOut, updateStart, updateSuccess, updateFailure } = userSlice.actions;

export default userSlice.reducer;