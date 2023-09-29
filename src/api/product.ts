import axiosClient from "../config/axiosClient";
import { IProductApiReturn, IProductFuncReturn } from "../types/apiUtilTypes";

export const getProducts = async () : Promise<IProductFuncReturn> => {
    try 
    {
        const res = await axiosClient.get("/product");
        const data: IProductApiReturn = res.data;
        if(res.status === 200) {
            return ({ isSuccess: true, products: (data.products) ? data.products : [], error: null });
        } else {
            return ({ isSuccess: false, products: [], error: data.message });
        }
    } 
    catch (error) { 
        console.log('Error while getting products : ');
        console.log(error);
        return ({ isSuccess: false, products: [], error: "Something went wrong" });
    }
}