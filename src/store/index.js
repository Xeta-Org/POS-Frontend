import { configureStore } from "@reduxjs/toolkit";
import ProductSlice from "./ProductSlice";
import UserSlice from './UserSlice';

const store = configureStore({
    reducer: {
        'product': ProductSlice.reducer,
        'user': UserSlice.reducer
    }
})

export default store