import axios from "axios";
import { checkInDate, checkOutDate, hostURL} from "../constants";

export const HotelGalleryRequest = async (hotelId:number) => {
  return await axios.get(`${hostURL}/api/hotels/${hotelId}/gallery`);
}

export const HotelDetailsRequest = async (hotelId:number) => {
  return await axios.get(`${hostURL}/api/hotels/${hotelId}`);
}

export const AvailableRoomsRequest = async (hotelId:number) => {
  return await axios.get(`${hostURL}/api/hotels/${hotelId}/available-rooms?checkInDate=${checkInDate}&CheckOutDate=${checkOutDate}`);
}
