import axios from "axios";
import { SearchRequestProps, SearchResponse } from "./types";
import { hostURL } from "../constants";

export const SearchRequest = async (searchRequest: SearchRequestProps) => {
  return await axios.get<SearchResponse[]>(`${hostURL}/api/home/search`, {
    params: searchRequest,
  });
};

export const CitiesRequest = async () => {
  return await axios.get(`${hostURL}/api/cities`);
};


export const AmenitiesRequest = async () => {
  return await axios.get(`${hostURL}/api/search-results/amenities`);
};