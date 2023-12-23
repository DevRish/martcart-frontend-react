import axiosClient from "../config/axiosClient";
import { IEventApiReturn, IEventFuncReturn } from "../types/apiUtilTypes";

export const getEvents = async () : Promise<IEventFuncReturn> => {
    try 
    {
        const res = await axiosClient.get("/event");
        const data: IEventApiReturn = res.data;
        console.log(data);
        if(res.status === 200) {
            return ({ isSuccess: true, events: (data.events) ? data.events : [], error: null, event: null });
        } else {
            return ({ isSuccess: false, events: [], error: data.message, event: null });
        }
    } 
    catch (error) { 
        console.log('Error while getting events : ');
        console.log(error);
        return ({ isSuccess: false, events: [], error: "Something went wrong", event: null });
    }
}

export const getEventById = async (id: string) : Promise<IEventFuncReturn> => {
    try 
    {
        const res = await axiosClient.get(`/event/${id}`);
        const data: IEventApiReturn = res.data;
        if(res.status === 200) {
            return ({ isSuccess: true, event: (data.event) ? data.event : null, events: [], error: null });
        } else {
            return ({ isSuccess: false, event: null, events: [], error: data.message });
        }
    } 
    catch (error) { 
        console.log('Error while getting events : ');
        console.log(error);
        return ({ isSuccess: false, event: null, events: [], error: "Something went wrong" });
    }
}