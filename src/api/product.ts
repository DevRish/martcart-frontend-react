import axiosClient from "../config/axiosClient";
import { IProductApiReturn, IProductFuncReturn } from "../types/apiUtilTypes";

export interface IProductQuery {
    id?: string, 
    name?: string, 
    minPrice?: number, 
    maxPrice?: number, 
    minRating?: number, 
    maxRating?: number, 
    categoryId?: string, 
    page?: number, 
    limit?: number
}

export const getProducts = async (query?: IProductQuery) : Promise<IProductFuncReturn> => {
    try 
    {
        const res = await axiosClient.get("/product", {
            params: query ? query : {}
        });
        const data: IProductApiReturn = res.data;
        console.log(data);
        if(res.status === 200) {
            return ({ isSuccess: true, products: (data.products) ? data.products : [], error: null, product: null, total: data.total });
        } else {
            return ({ isSuccess: false, products: [], error: data.message, product: null });
        }
    } 
    catch (error) { 
        console.log('Error while getting products : ');
        console.log(error);
        return ({ isSuccess: false, products: [], error: "Something went wrong", product: null });
    }
}

export const getProductById = async (id: string) : Promise<IProductFuncReturn> => {
    try 
    {
        const res = await axiosClient.get(`/product/${id}`);
        const data: IProductApiReturn = res.data;
        if(res.status === 200) {
            return ({ isSuccess: true, product: (data.product) ? data.product : null, products: [], error: null });
        } else {
            return ({ isSuccess: false, product: null, products: [], error: data.message });
        }
    } 
    catch (error) { 
        console.log('Error while getting products : ');
        console.log(error);
        return ({ isSuccess: false, product: null, products: [], error: "Something went wrong" });
    }
}