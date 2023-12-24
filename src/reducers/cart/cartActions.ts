import { IAction, IProduct, IGlobalCartState } from "../../types/coreTypes"

export enum cartActionTypes {
    ADD_ITEM = "ADD_ITEM", // add 1 instance of an item to cart
    REMOVE_ITEM = "REMOVE_ITEM", // remove 1 instance of an item from cart
    SET_CART = "SET_CART" // overwrite cart
}

export function addItemToCartAction(product: IProduct): IAction {
    return {
        type: cartActionTypes.ADD_ITEM,
        payload: product,
    }
}

export function removeItemFromCartAction(productId: string): IAction {
    return {
        type: cartActionTypes.REMOVE_ITEM,
        payload: productId,
    }
}

export function setCartAction(newCartState: IGlobalCartState): IAction {
    return {
        type: cartActionTypes.SET_CART,
        payload: newCartState,
    }
}