import { ILoginCredentials, IAuthFuncReturn, IAuthApiReturn } from "../types/apiUtilTypes";
import { IUser } from "../types/coreTypes";
import axiosClient from "./../config/axiosClient";

export const authLogIn = async (credentials: ILoginCredentials) : Promise<IAuthFuncReturn> => {
    try 
    {
        const res = await axiosClient.post("/auth/login", credentials);
        const data: IAuthApiReturn = res.data;
        if(res.status === 200) {
            axiosClient.defaults.headers.common["Authorization"] = "Bearer " + data.token;
            return ({ isSuccess: true, error: null, user: (data.user) ? data.user : null });
        } else {
            return ({ isSuccess: false, error: data.message, user: null });
        }
    } catch (error) { 
        console.log('Error in login : ' + error);
        return { isSuccess: false, error: "Something went wrong", user: null };
    }
}

export const authSignUp = async (newUser: IUser) : Promise<IAuthFuncReturn> => {
    try
    {
        const res = await axiosClient.post("/auth/signup", newUser);
        const data: IAuthApiReturn = res.data;
        if(res.status === 200) {
            axiosClient.defaults.headers.common["Authorization"] = "Bearer " + data.token;
            return ({ isSuccess: true, error: null, user: (data.user) ? data.user : null });
        } else {
            return ({ isSuccess: false, error: data.message, user: null });
        }
    }
    catch (error) { 
        console.log('Error in signup : ' + error);
        return { isSuccess: false, error: "Something went wrong", user: null };
    }
}

export const authLogout = async () : Promise<IAuthFuncReturn> => {
    try 
    {
        const res = await axiosClient.post("/auth/logout");
        const data: IAuthApiReturn = res.data;
        if(res.status === 200) {
            axiosClient.defaults.headers.common["Authorization"] = "";
            return ({ isSuccess: true, error: null, user: null });
        }
        else {
            return ({ isSuccess: false, error: data.message, user: null });
        }
    } 
    catch (error) { 
        console.log('Error while logging out : ' + error);
        return { isSuccess: false, error: "Something went wrong", user: null };
    }
}