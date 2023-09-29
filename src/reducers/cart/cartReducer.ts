import { ICartItem, IAction } from "../../types/coreTypes";
import { cartActionTypes } from "./cartActions";

const initialState: ICartItem[] = [];

export function cartReducer(state = initialState, action: IAction): ICartItem[] {
    switch (action.type) {
        case cartActionTypes.ADD_ITEM: {
            let exists = false;
            const newState = state.map((item: ICartItem) => {
                if(item.product._id === action.payload._id) {
                    item.quantity = item.quantity + 1;
                    exists = true;
                }
                return item;
            });
            if(!exists) newState.push({ product: action.payload, quantity: 1 });
            return newState;
        }
        case cartActionTypes.REMOVE_ITEM: {
            return state.map((item: ICartItem) => { // decrease quantity
                if(item.product._id === action.payload) item.quantity = item.quantity - 1;
                return item;
            }).filter((item: ICartItem) => (item.quantity !== 0)); // if quantity became 0, exclude it
        }
        case cartActionTypes.SET_CART: {
            return action.payload;
        }
        default:
            return state;
    }
}