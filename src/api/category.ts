import axiosClient from "../config/axiosClient";
import { ICategoryApiReturn, ICategoryFuncReturn } from "../types/apiUtilTypes";

export const getCategories = async () : Promise<ICategoryFuncReturn> => {
    try 
    {
        const res = await axiosClient.get("/category");
        const data: ICategoryApiReturn = res.data;
        console.log(data);
        if(res.status === 200) {
            return ({ isSuccess: true, categories: (data.categories) ? data.categories : [], error: null, category: null });
        } else {
            return ({ isSuccess: false, categories: [], error: data.message, category: null });
        }
    } 
    catch (error) { 
        console.log('Error while getting categories : ');
        console.log(error);
        return ({ isSuccess: false, categories: [], error: "Something went wrong", category: null });
    }
}

export const getCategoryById = async (id: string) : Promise<ICategoryFuncReturn> => {
    try 
    {
        const res = await axiosClient.get(`/category/${id}`);
        const data: ICategoryApiReturn = res.data;
        if(res.status === 200) {
            return ({ isSuccess: true, category: (data.category) ? data.category : null, categories: [], error: null });
        } else {
            return ({ isSuccess: false, category: null, categories: [], error: data.message });
        }
    } 
    catch (error) { 
        console.log('Error while getting categories : ');
        console.log(error);
        return ({ isSuccess: false, category: null, categories: [], error: "Something went wrong" });
    }
}