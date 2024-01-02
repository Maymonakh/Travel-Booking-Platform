import axios from "axios";
import { hostURL,bookingId} from "../constants";
import { BookingRequestProps, BookingResponse} from "./types";

export const ConfirmationRequest = async (token :string | null) => {
  const headers = {
    Authorization: ` Bearer ${token}`,
  }
    return await axios.get(`${hostURL}/api/bookings/${bookingId}`,{headers})
}

export function BookingRequest (token :string | null , req: BookingRequestProps){
  const headers = {
    Authorization: ` Bearer ${token}`,
  }
  return axios.post<BookingResponse>(`${hostURL}/api/bookings`,req,{headers})
  }
