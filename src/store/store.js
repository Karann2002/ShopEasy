import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Auth-slice/index'; // Adjust the import path as necessary


const store = configureStore({
    reducer: {
        auth: authReducer,
    },});
    
export default store;