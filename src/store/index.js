import { configureStore } from "@reduxjs/toolkit";
import collectionReducer from './collectionSlice'
import recognizeReducer from './recognizeSlice'
import authReducer from './authSlice'

export const store = configureStore({
    reducer: {
        collection: collectionReducer,
        recognize: recognizeReducer,
        auth: authReducer,
    },
})