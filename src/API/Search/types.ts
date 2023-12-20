export interface amenities{
  id: number;
  name: string;
  description: string;
}

export interface SearchRequestProps {
  checkInDate: string;
  checkOutDate: string;
  city: string;
  starRate: number;
  sort: string;
  numberOfRooms: number;
  adults: number;
  children: number;
}

export interface SearchResponse {
  hotelName: string;
  starRating: number;
  latitude: number;
  longitude: number;
  roomPrice: number;
  roomType: string;
  cityName: string;
  roomPhotoUrl: string;
  discount: number;
  amenities: amenities[];
}

export interface CitiesResponse {
  id: number;
  name: string;
  description: string;
}