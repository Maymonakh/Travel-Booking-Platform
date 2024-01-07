import axios from "axios";
import { CheckOutDate, checkInDate, hostURL } from "../constants";
import { CreateCityProps, CreateHotelProps, CreateRoomProps} from "./types";


export const HotelsRequest = async () => {
  return await axios.get(`${hostURL}/api/hotels`);
};

export const CitiesRequest = async () => {
  return await axios.get(`${hostURL}/api/cities`);
};

export const CityHotelsRequest = async (cityId:number | null ) => {
  return await axios.get(`${hostURL}/api/cities/${cityId}/hotels`);
};

export const HotelRoomsRequest = async (hotelId:number | null ) => {
  return await axios.get(`${hostURL}/api/hotels/${hotelId}/rooms/?checkInDate=${checkInDate}&CheckOutDate=${CheckOutDate}`);
};

export const addCity = async (cityData: CreateCityProps, token: string | null) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return await axios.post(`${hostURL}/api/cities`, cityData, { headers });
};

export const deleteCity = async (cityId: number, token: string | null) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return await axios.delete(`${hostURL}/api/cities/${cityId}`, { headers });
};

export const editCity = async (cityId: number,cityData: CreateCityProps, token: string | null) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return await axios.put(`${hostURL}/api/cities/${cityId}`, cityData, { headers });
};

export const deleteHotel = async (cityId:number,hotelId: number, token: string | null) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return await axios.delete(`${hostURL}/api/cities/${cityId}/hotels/${hotelId}`, { headers });
};

export const addHotel = async (cityId:number,hotelData: CreateHotelProps, token: string | null) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return await axios.post(`${hostURL}/api/cities/${cityId}/hotels`, hotelData, { headers });
};

export const editHotel = async (hotelId: number,hotelData: CreateHotelProps, token: string | null) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return await axios.put(`${hostURL}/api/hotels/${hotelId}`, hotelData, { headers });
};

export const deleteRoom = async (hotelId:number,roomId: number, token: string | null) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return await axios.delete(`${hostURL}/api/hotels/${hotelId}/rooms/${roomId}`, { headers });
};

export const addRoom = async (hotelId:number,roomData: CreateRoomProps, token: string | null) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return await axios.post(`${hostURL}/api/hotels/${hotelId}/rooms`, roomData, { headers });
};

export const editRoom = async (roomId: number,roomData: CreateRoomProps, token: string | null) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return await axios.put(`${hostURL}/api/rooms/${roomId}`, roomData, { headers });
};



// export const HotelRequest = async (searchRequest: HotelsResponse) => {
//   return await axios.get<HotelsResponse[]>(`${hostURL}/api/hotels`, {
//     params: searchRequest,
//   });
// };

// export const CityRequest = async (searchRequest: CitiesResponse) => {
//   return await axios.get<CitiesResponse[]>(`${hostURL}/api/cities`, {
//     params: searchRequest,
//   });
// };





