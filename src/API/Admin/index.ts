import axios from "axios";
import { hostURL } from "../constants";


export const HotelsRequest = async () => {
  return await axios.get(`${hostURL}/api/hotels`);
};



