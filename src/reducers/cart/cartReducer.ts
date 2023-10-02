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
            let newItems = [];
            for(let item of state.items) {
                newItems.push(JSON.parse(JSON.stringify(item)));
            }
            newItems = newItems.map((item: ICartItem) => {
                const itemDup = {...item};
                if(itemDup.productId._id === action.payload._id) {
                    itemDup.quantity = itemDup.quantity + 1;
                    exists = true;
                }
                return itemDup;
            });
            if(!exists) newItems.push({ productId: action.payload, quantity: 1 });
            const newTotal = state.total + 1;
            return { items: newItems, total: newTotal };
        }
        case cartActionTypes.REMOVE_ITEM: {
            let newItems = [];
            for(let item of state.items) {
                newItems.push(JSON.parse(JSON.stringify(item)));
            }
            newItems = newItems.map((item: ICartItem) => { // decrease quantity
                const itemDup = {...item};
                if(itemDup.productId._id === action.payload) itemDup.quantity = itemDup.quantity - 1;
                return itemDup;
            }).filter((item: ICartItem) => (item.quantity !== 0)); // if quantity became 0, exclude it
            return {
                items: newItems,
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