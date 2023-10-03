import { IAction, IOrder } from "../../types/coreTypes"

export enum orderActionTypes {
    ADD_ORDERS = "ADD_ORDERS", // add an order
    SET_ORDERS = "SET_ORDERS" // completely modify the orders state
};

export function addOrdersAction(orders: IOrder[]): IAction {
    return {
        type: orderActionTypes.ADD_ORDERS,
        payload: orders,
    }
}

export function setOrdersAction(newOrders: IOrder[]): IAction {
    return {
        type: orderActionTypes.SET_ORDERS,
        payload: newOrders,
    }
}