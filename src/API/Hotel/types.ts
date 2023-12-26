export interface amenities{
    name: string;
    description: string;
  }
  

export interface HotelGalleryResponse {
    id: number;
    url: string;
  }

  export interface HotelDetailsResponse {
    hotelName: string;
    location: string;
    description: string;
    latitude: number;
    longitude: number;
    amenities:amenities[];
    starRating: number;
    availableRooms: number;
    imageUrl: string;
  }