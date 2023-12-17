import axios from "axios";
import { LoginRequestProps, LoginResponse } from "./types";
import { hostURL } from "../constants";

export function loginRequest (req: LoginRequestProps){
return axios.post<LoginResponse>(`${hostURL}/api/auth/authenticate`,req)
}