import axios from "axios";
import { hostURL ,userId} from "../constants";

export const trendingDestinationsRequest = async () => {
    return await axios.get(`${hostURL}/destinations/trending`)
}

export const featuresDealsRequest = async () => {
    return await axios.get(`${hostURL}/api/home/featured-deals`)
}

export const visitedHotelsRequest = async (token :string | null ) => {
    const headers = {
      Authorization: ` Bearer ${token}`,
    }
    return await axios.get(`${hostURL}/users/${userId}/recent-hotels`, {headers})
  }

