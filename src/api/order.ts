import { SERVER_URL } from "../config/keys";
import { IOrderApiReturn, IOrderDetails, IOrderFuncReturn } from "../types/apiUtilTypes";
import axiosClient from "../config/axiosClient";

const BASE_URL = `${SERVER_URL}/api`;

export const getOrders = async () : Promise<IOrderFuncReturn> => {
    try 
    {
        const res = await axiosClient.get("/order/getorderdata");
        const data: IOrderApiReturn = res.data;
        if(res.status === 200) {
            return ({ isSuccess: true, orders: (data.orders) ? data.orders : [], error: null, order: null });
        } else {
            return ({ isSuccess: false, orders: [], error: data.message, order: null });
        }
    } 
    catch (error) { 
        console.log('Error while getting cart : ');
        console.log(error);
        return ({ isSuccess: false, orders: [], error: "Something went wrong", order: null });
    }
}

export const addNewOrder = async (orderDetails: IOrderDetails) => {
    try 
    {
        const res = await axiosClient.post("/order/addOrder", orderDetails);
        const data: IOrderApiReturn = res.data;
        if(res.status === 200) {
            return ({ isSuccess: true, orders: [], error: null, order: (data.order) ? data.order : null });
        } else {
            return ({ isSuccess: false, orders: [], error: data.message, order: null });
        }
    } 
    catch (error) { 
        console.log('Error while getting cart : ');
        console.log(error);
        return ({ isSuccess: false, orders: [], error: "Something went wrong", order: null });
    }
}