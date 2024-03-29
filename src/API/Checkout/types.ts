export interface BookingRequestProps{
  customerName: string;
  hotelName: string;
  roomNumber: string;
  roomType: string;
  bookingDateTime: string;
  totalCost: number;
  paymentMethod:string;
  bookingStatus: string;
}

export interface BookingResponse {
  customerName: string;
  hotelName: string;
  roomNumber: string;
  roomType: string;
  bookingDateTime: string;
  totalCost: number;
  paymentMethod:string;
  bookingStatus: string;
}
