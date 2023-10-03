
import { IAction, IOrder } from "../../types/coreTypes";
import { orderActionTypes } from "./orderActions";

const initialState: IOrder[] = [];

export function orderReducer(state = initialState, action: IAction): IOrder[] {
    switch (action.type) {
        case orderActionTypes.ADD_ORDERS: {
            return [ ...state, ...action.payload ];
        }
        case orderActionTypes.SET_ORDERS: {
            return action.payload;
        }
        default:
            return state;
    }
}