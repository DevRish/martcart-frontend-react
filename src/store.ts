import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers/rootReducer";
import logger from "redux-logger";
import { IGlobalState } from "./types/coreTypes";

const preloadedState: IGlobalState = {
    auth: {
        isLoggedIn: false,
        user: null,
    },
    cart: {
        items: [],
        total: 0,
    },
    orders: [],
};

const store = configureStore({
    reducer: rootReducer,
    preloadedState: preloadedState,
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger), // redux-thunk middleware present by default on redux-toolkit
    // enhancers: <no enhancers used yet>
});

export default store;