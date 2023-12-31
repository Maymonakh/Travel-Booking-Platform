import React, { useState, useEffect } from "react";
import { Grid, Typography, Container, Rating } from "@mui/material";
import { HotelDetailsResponse } from "../../../API/Hotel/types";
import { HotelDetailsRequest } from "../../../API/Hotel";
import Location from "./Location";
import { useLocation } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const HotelDetails = () => {
  const locations = useLocation();
  const hotelId = locations.state?.results || [];

  const [hotelDetailsData, setHotelDetailsData] =
    useState<HotelDetailsResponse>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await HotelDetailsRequest(hotelId);
        setHotelDetailsData(response.data);
        console.log(response.data);
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

  const defaultLocation = [31.908317, 35.200541];
  const position: [number, number] = [
    latitude ?? defaultLocation[0],
    longitude ?? defaultLocation[1],
  ];

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
      <Typography variant="h5" fontStyle={'bold'} marginBottom={2}>
        {hotelName}
      </Typography>
      <Typography variant="body1" marginBottom={1}>
        <LocationOnIcon style={{ marginRight: "5px", color: "blue" ,fontSize:'medium'}} />
        {location}
      </Typography>
      <Typography variant="subtitle1" marginBottom={1}>
        {description}
      </Typography>

      <Rating name="read-only" value={starRating ?? 0} readOnly />
      <Typography variant="body1" marginTop={1}>
        Available Rooms: {availableRooms}
      </Typography>
      <Location position={position} />
    </Container>
  );
};

export default HotelDetails;
