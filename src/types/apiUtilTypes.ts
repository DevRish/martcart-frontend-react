import { ICartItem, IOrder, IProduct, IUser } from "./coreTypes"

export interface IAuthApiReturn {
    message: string,
    token?: string,
    user?: IUser
};

export interface IAuthFuncReturn {
    isSuccess: boolean,
    error: string | null,
    user: IUser | null,
};

export interface ILoginCredentials { 
    username: string, 
    password: string 
};

export interface ICartApiReturn {
    message: string,
    cart?: ICartItem[],
    product?: IProduct,
};

export interface ICartFuncReturn {
    isSuccess: boolean,
    error: string | null,
    product: IProduct | null,
    cart: ICartItem[],
};

export interface IOrderApiReturn {
    message: string,
    order?: IOrder,
    orders?: IOrder[],
};

export interface IOrderFuncReturn {
    isSuccess: boolean,
    error: string | null,
    order: IOrder | null,
    orders: IOrder[],
};

export interface IOrderDetails { 
    productId: string, 
    quantity: number, 
    address: string,
};