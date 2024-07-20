import { configureStore } from "@reduxjs/toolkit";
import autenticReducer from "../features/authSlice";
import registroReducer from "../features/registroSlice"

export const store = configureStore({
    reducer: {
        auth: autenticReducer,
        registro: registroReducer
    },
});
