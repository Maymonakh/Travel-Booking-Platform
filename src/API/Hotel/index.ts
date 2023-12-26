import axios from "axios";
import { checkInDate, checkOutDate, hostURL ,hotelId} from "../constants";

export const HotelGalleryRequest = async () => {
    return await axios.get(`${hostURL}/api/hotels/${hotelId}/gallery`)
}

export const HotelDetailsRequest = async () => {
    return await axios.get(`${hostURL}/api/hotels/${hotelId}`)
}

export const AvailableRoomsRequest = async () => {
    return await axios.get(`${hostURL}/api/hotels/${hotelId}/available-rooms?checkInDate=${checkInDate}&CheckOutDate=${checkOutDate}`)
  }
  