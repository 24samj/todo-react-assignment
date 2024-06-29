import { configureStore } from "@reduxjs/toolkit";
import todoReducer, { subscribeToStore } from "./slices/todoSlice";

const store = configureStore({
    reducer: {
        todos: todoReducer,
    },
});

subscribeToStore(store);

export default store;
