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

export interface amenities{
    id: number;
    name: string;
    description: string;
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

  
  export interface TrendingDestinationResponse {
    cityName: string;
    countryName: string;
    description:string;
    thumbnailUrl: string;
  }

  export interface FeaturesDealsResponse {
    originalRoomPrice: number;
    discount: number;
    finalPrice: number;
    cityName: string;
    hotelName: string;
    hotelStarRating: number;
    title: string;
    description: string;
    roomPhotoUrl: string;
  }

  export interface VisitedHotelsResponse {
    hotelName: string;
    starRating: number;
    visitDate: string;
    cityName: string;
    thumbnailUrl: string;
  }
  

  
