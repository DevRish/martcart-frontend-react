import axiosClient from "../config/axiosClient";
import { ICartApiReturn, ICartFuncReturn } from "../types/apiUtilTypes";
import { ICartItem } from "../types/coreTypes";

export const getCart = async () : Promise<ICartFuncReturn> => {
    try 
    {
        const res = await axiosClient.get("/cart/getCart");
        const data: ICartApiReturn = res.data;
        if(res.status === 200) {
            const total = data.cart ? data.cart.reduce((accumulator, currentValue: ICartItem) => (accumulator + currentValue.quantity), 0) : 0;
            return ({ isSuccess: true, cart: (data.cart) ? { items: data.cart, total } : {items: [], total: 0 }, error: null, product: null });
        } else {
            return ({ isSuccess: false, cart: { items: [], total: 0 }, error: data.message, product: null });
        }
    } 
    catch (error) { 
        console.log('Error while getting cart : ');
        console.log(error);
        return ({ isSuccess: false, cart: { items: [], total: 0 }, error: "Something went wrong", product: null });
    }
}

export const addCartItem = async (productId: string) : Promise<ICartFuncReturn> => {
    try 
    {
        const res = await axiosClient.post("/cart/addItem", { productId });
        const data: ICartApiReturn = res.data;
        if(res.status === 200) {
            return ({ isSuccess: true, product: (data.product) ? data.product : null, error: null, cart: { items: [], total: 0 } });
        } else {
            return ({ isSuccess: false, product: null, error: data.message, cart: { items: [], total: 0 } });
        }
    } 
    catch (error) { 
        console.log('Error while adding item to cart : ');
        console.log(error);
        return ({ isSuccess: false, product: null, cart: { items: [], total: 0 }, error: "Something went wrong" });
    }
}

export const removeCartItem = async (productId: string) : Promise<ICartFuncReturn> => {
    try 
    {
        const res = await axiosClient.post("/cart/removeItem", { productId });
        const data: ICartApiReturn = res.data;
        if(res.status === 200) {
            return ({ isSuccess: true, product: (data.product) ? data.product : null, error: null, cart: { items: [], total: 0 } });
        } else {
            return ({ isSuccess: false, product: null, error: data.message, cart: { items: [], total: 0 } });
        }
    } 
    catch (error) { 
        console.log('Error while removing item from cart : ');
        console.log(error);
        return ({ isSuccess: false, product: null, cart: { items: [], total: 0 }, error: "Something went wrong" });
    }
}

export const emptyCart = async () : Promise<ICartFuncReturn> => {
    try 
    {
        const res = await axiosClient.post("/cart/emptyCart");
        const data: ICartApiReturn = res.data;
        if(res.status === 200) {
            return ({ isSuccess: true, product: null, error: null, cart: { items: [], total: 0 } });
        } else {
            return ({ isSuccess: false, product: null, error: data.message, cart: { items: [], total: 0 } });
        }
    } 
    catch (error) { 
        console.log('Error while emptying cart : ');
        console.log(error);
        return ({ isSuccess: false, product: null, cart: { items: [], total: 0 }, error: "Something went wrong" });
    }
}