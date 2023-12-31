import React, { useState, useEffect } from "react";
import { Grid, Typography, Container, CircularProgress, CardMedia } from "@mui/material";
import { HotelGalleryResponse } from "../../../API/Hotel/types";
import { HotelGalleryRequest } from "../../../API/Hotel";
import { useLocation } from "react-router-dom";

const HotelGallery = () => {
  const location = useLocation();
  const hotelId = location.state?.results || [];

  console.log(hotelId)

  const [hotelGalleryData, setHotelGalleryData] = useState<
    HotelGalleryResponse[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await HotelGalleryRequest(hotelId);
        setHotelGalleryData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <Container
      sx={{
        backgroundColor: "white",
        marginTop: 5,
        paddingTop: 5,
        paddingBottom: 2,
        borderRadius: 5,
      }}
    >
      <Grid item xs={12} marginBottom={3}>
        <Typography variant="h5">Hotel Gallery:</Typography>
      </Grid>
      <Grid
        container
        spacing={2}
        direction="column"
        sx={{
          maxHeight: 350,
          overflowX: "scroll",
          paddingBottom: 3,
        }}
      >
        {hotelGalleryData.length === 0 ? (
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <CircularProgress />
          </Grid>
        ) : (
          hotelGalleryData.map((hotel, index) => (
            <Grid item key={index} xs={12} lg={4}>
              <CardMedia
                component="img"
                height="140"
                image={hotel.url}
              />
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default HotelGallery;
