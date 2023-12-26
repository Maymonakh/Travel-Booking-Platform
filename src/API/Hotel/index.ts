import axios from "axios";
import { hostURL ,hotelId} from "../constants";

export const HotelGalleryRequest = async () => {
    return await axios.get(`${hostURL}/api/hotels/${hotelId}/gallery`)
}

export const HotelDetailsRequest = async () => {
    return await axios.get(`${hostURL}/api/hotels/${hotelId}`)
}