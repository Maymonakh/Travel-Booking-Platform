
export interface HotelsResponse {
  id: number;
  name: string;
  description: string;
  hotelType: number;
  starRating: number;
  latitude: number;
  longitude: number;
}

export interface CitiesResponse {
  id: number;
  name: string;
  description: string;
}

export interface CreateCityProps {
  name: string;
  description: string;
}

export interface CreateHotelProps{
  name: string;
  description: string;
  hotelType: number;
  starRating: number;
}

export interface CreateRoomProps {
  roomNumber: string;
  cost: number
}

export interface CityHotelsResponse{
  id: number,
  name: string,
  description: string,
  hotelType: number,
  starRating: number,
  latitude:number,
  longitude: number
}

export interface amenities{
  name: string;
  description: string;
}

export interface HotelRoomsResponse{
  roomId: number,
  roomNumber: number;
  roomPhotoUrl: string;
  roomType: string;
  capacityOfAdults: number;
  capacityOfChildren: number;
  roomAmenities:amenities[];
  price: number;
  availability: boolean;
}



