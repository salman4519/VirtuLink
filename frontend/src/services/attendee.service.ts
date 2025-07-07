import { ATTENDEE_ROUTES } from "../utils/route.constants";
import api from "./api";

export const AttendeeService = {
    getProfile:async ()=>{
        try {
            const response = await api.get(ATTENDEE_ROUTES.GET_PROFILE);
            console.log(response)
            return response.data
        } catch (error:unknown) {
            console.log(error);
            throw new Error(error.message)
        }
    }
}