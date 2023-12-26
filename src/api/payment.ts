import axiosClient from "../config/axiosClient";
import { IPaymentApiReturn, IPaymentFuncReturn } from "../types/apiUtilTypes";

export const createRzpOrder = async (amount: number) : Promise<IPaymentFuncReturn> => {
    try 
    {
        const res = await axiosClient.post("/payment/createOrder", { amount });
        const data: IPaymentApiReturn = res.data;
        // console.log(data);
        if(res.status === 200) {
            return ({ isSuccess: true, error: null, orderId: data.orderId });
        } else {
            return ({ isSuccess: false, error: data.message, orderId: "" });
        }
    } 
    catch (error) { 
        console.log('Error while getting categories : ');
        console.log(error);
        return ({ isSuccess: false, error: "Something went wrong", orderId: "" });
    }
}