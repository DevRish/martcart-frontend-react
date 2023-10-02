import { IAction, IOrder } from "../../types/coreTypes"

export enum orderActionTypes {
    ADD_ORDER = "ADD_ORDER", // add an order
    SET_ORDERS = "SET_ORDERS" // completely modify the orders state
};

export function addOrderAction(order: IOrder): IAction {
    return {
        type: orderActionTypes.ADD_ORDER,
        payload: order,
    }
}

export function setOrdersAction(newOrders: IOrder[]): IAction {
    return {
        type: orderActionTypes.SET_ORDERS,
        payload: newOrders,
    }
}