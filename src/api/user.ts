import axiosClient from "../config/axiosClient";
import { IUserApiReturn, IUserFuncReturn } from "../types/apiUtilTypes";

export const getUserData = async () : Promise<IUserFuncReturn> => {
    try 
    {
        const res = await axiosClient.get("/user/getUser");
        const data: IUserApiReturn = res.data;
        if(res.status === 200) {
            return ({ isSuccess: true, user: (data.user) ? data.user : null, error: null });
        } else {
            return ({ isSuccess: false, user: null, error: data.message });
        }
    } 
    catch (error) { 
        console.log('Error while getting cart : ');
        console.log(error);
        return ({ isSuccess: false, user: null, error: "Something went wrong" });
    }
}