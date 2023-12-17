export interface LoginRequestProps{
    userName: string;
    password: string;
}

export interface LoginResponse{
    userType:string;
    authentication:string;
}