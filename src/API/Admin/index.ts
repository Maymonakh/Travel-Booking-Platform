import axios from "axios";
import { hostURL } from "../constants";
import { CitiesResponse, CreateCityProps, HotelsResponse } from "./types";


export const HotelsRequest = async () => {
  return await axios.get(`${hostURL}/api/hotels`);
};

export const CitiesRequest = async () => {
  return await axios.get(`${hostURL}/api/cities`);
};

export const CityHotelsRequest = async (cityId:number | null ) => {
  return await axios.get(`${hostURL}/api/cities/${cityId}/hotels`);
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

export const deleteHotel = async (hotelId: number, token: string | null) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return await axios.delete(`${hostURL}/api/hotels/${hotelId}`, { headers });
};

export const addHotel = async (hotelData: CreateCityProps, token: string | null) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  return await axios.post(`${hostURL}/api/cities`, hotelData, { headers });
};

// export const HotelRequest = async (searchRequest: HotelsResponse) => {
//   return await axios.get<HotelsResponse[]>(`${hostURL}/api/hotels`, {
//     params: searchRequest,
//   });
// };

export const CityRequest = async (searchRequest: CitiesResponse) => {
  return await axios.get<CitiesResponse[]>(`${hostURL}/api/cities`, {
    params: searchRequest,
  });
};



export const HotelRoomsRequest = async (hotelId:number | null ) => {
  return await axios.get(`${hostURL}/api/hotels/${hotelId}/rooms`);
};


