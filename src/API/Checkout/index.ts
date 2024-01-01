import axios from "axios";
import { hostURL ,userId} from "../constants";
import { BookingRequestProps, BookingResponse } from "./types";

export const ConfirmationRequest = async () => {
    return await axios.get(`${hostURL}/api/bookings/{bookingId}`)
}

export function BookingRequest (token :string | null , req: BookingRequestProps){
  const headers = {
    Authorization: ` Bearer ${token}`,
  }
  return axios.post<BookingResponse>(`${hostURL}/api/bookings`,req,{headers})
  }
