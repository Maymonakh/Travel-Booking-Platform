import axios from "axios";
import { hostURL } from "../constants";

export const trendingDestinationsRequest = async () => {
    return await axios.get(`${hostURL}/destinations/trending`)
}

export const featuresDealsRequest = async () => {
    return await axios.get(`${hostURL}/api/home/featured-deals`)
}

  