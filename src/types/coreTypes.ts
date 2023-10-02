export interface IAction {
    type: string,
    payload: any,
};

export interface IGlobalAuthState {
    isLoggedIn: boolean,
    user: { 
        firstname: string,
        lastname: string, 
    } | null,
};

export interface IProduct {
    _id?: string,
    prod_name: string,
    img_url: string,
    price: number,
    discount_percent: number,
    tags: [string],
};

export interface ICartItem {
    _id?: string, // since mongodb was assigning ids to these objects too
    productId: IProduct,
    quantity: number,
};

export interface IGlobalCartState {
    items: ICartItem[],
    total: number,
};

export interface IUser {
    _id?: string,
    firstname: string,
    lastname: string,
    username?: string,
    phone?: string,
    email?: string,
    password?: string,
    cart: ICartItem[],
    joinDate?: string,
}

export interface IOrder {
    _id?: string,
    productId: IProduct,
    userId?: string,
    quantity: number,
    address: string,
    totalPrice: number,
    orderedAt: string,
}

export interface IGlobalState {
    auth: IGlobalAuthState,
    cart: IGlobalCartState,
    orders: IOrder[],
};
