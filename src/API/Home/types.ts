export interface TrendingDestinationResponse {
  cityName: string;
  countryName: string;
  description: string;
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
