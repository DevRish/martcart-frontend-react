import { ICartItem, IAction, IGlobalCartState } from "../../types/coreTypes";
import { cartActionTypes } from "./cartActions";

const initialState: IGlobalCartState = {
    items: [],
    total: 0,
};

export function cartReducer(state = initialState, action: IAction): IGlobalCartState {
    switch (action.type) {
        case cartActionTypes.ADD_ITEM: {
            let exists = false;
            const newItems = state.items.map((item: ICartItem) => {
                if(item.product._id === action.payload._id) {
                    item.quantity = item.quantity + 1;
                    exists = true;
                }
                return item;
            });
            if(!exists) newItems.push({ product: action.payload, quantity: 1 });
            const newTotal = state.total + 1;
            return { items: newItems, total: newTotal };
        }
        case cartActionTypes.REMOVE_ITEM: {
            return {
                items: state.items.map((item: ICartItem) => { // decrease quantity
                    if(item.product._id === action.payload) item.quantity = item.quantity - 1;
                    return item;
                }).filter((item: ICartItem) => (item.quantity !== 0)), // if quantity became 0, exclude it
                total: state.total - 1,
            };
        }
        case cartActionTypes.SET_CART: {
            return action.payload;
        }
        default:
            return state;
    }
}