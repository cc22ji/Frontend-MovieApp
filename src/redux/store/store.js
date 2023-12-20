import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "../slice/MovieSlice"


export const store = configureStore({
    reducer : moviesReducer,
})

export default store