import { IAction, IGlobalState } from "../types/coreTypes";
import { authReducer } from "./auth/authReducer";
import { cartReducer } from "./cart/cartReducer";
import { orderReducer } from "./order/orderReducer";

export default function rootReducer(state: any = {}, action: IAction): IGlobalState {
    return {
        auth: authReducer(state.auth, action),
        cart: cartReducer(state.cart, action),
        orders: orderReducer(state.orders, action),
    }
}