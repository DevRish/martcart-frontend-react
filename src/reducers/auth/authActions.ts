import { IAction } from "../../types/coreTypes"


export enum authActionTypes {
    LOGIN = "LOGIN",
    LOGOUT = "LOGOUT",
}

export function loginAction(user: { firstname: string, lastname: string }): IAction {
    return {
        type: authActionTypes.LOGIN,
        payload: user,
    }
}

export function logoutAction(): IAction {
    return {
        type: authActionTypes.LOGOUT,
        payload: null,
    }
}