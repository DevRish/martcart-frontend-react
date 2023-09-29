import { IGlobalAuthState, IAction } from "../../types/coreTypes";
import { authActionTypes } from "./authActions";

const initialState: IGlobalAuthState = {
    isLoggedIn: false,
    user: null,
};

export function authReducer(state = initialState, action: IAction): IGlobalAuthState {
    switch (action.type) {
        case authActionTypes.LOGIN: {
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload
            };
        }
        case authActionTypes.LOGOUT: {
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            }
        }
        default:
            return state
    }
}