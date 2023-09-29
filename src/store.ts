import { configureStore } from "@reduxjs/toolkit";
import rootReducer, { IGlobalState } from "./reducers/rootReducer";
import logger from "redux-logger";

const preloadedState: IGlobalState = {
    auth: {
        isLoggedIn: false,
        user: null,
    }
};

const store = configureStore({
    reducer: rootReducer,
    preloadedState: preloadedState,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger), // redux-thunk middleware present by default on redux-toolkit
    // enhancers: <no enhancers used yet>
});

export default store;