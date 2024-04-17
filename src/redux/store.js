import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "./slices/authentication/index";

export const store = configureStore({
    reducer: {
        authentication: authenticationReducer
    }
});

export default store;