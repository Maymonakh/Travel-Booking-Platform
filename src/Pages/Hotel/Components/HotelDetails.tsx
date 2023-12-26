import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Container,
  Rating,
} from "@mui/material";
import { HotelDetailsResponse } from "../../../API/Hotel/types";
import { HotelDetailsRequest } from "../../../API/Hotel";
import Location from "./Location";

const HotelDetails = () => {
  const [hotelDetailsData, setHotelDetailsData] =
    useState<HotelDetailsResponse>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await HotelDetailsRequest();
        setHotelDetailsData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const {
    hotelName,
    location,
    description,
    latitude,
    longitude,
    starRating,
    availableRooms,
  } = hotelDetailsData || {};

  const position: [number, number] = [latitude || 0, longitude || 0];


  return (
    <Container
      sx={{
        backgroundColor: "white",
        marginTop: 5,
        paddingTop: 3,
        paddingBottom: 2,
        borderRadius: 5,
      }}
    >
      <Typography variant="h5" marginBottom={1}>
        {hotelName}
      </Typography>
      <Typography variant="body1" marginBottom={1}>
        {location}
      </Typography>
      <Typography variant="subtitle1" marginBottom={1}>
        {description}
      </Typography>

      <Rating name="read-only" value={starRating} readOnly />
      <Typography variant="body1" marginTop={1}>
        Available Rooms: {availableRooms}
      </Typography>
      <Location position={position}/>
    </Container>
  );
};

export default HotelDetails;
