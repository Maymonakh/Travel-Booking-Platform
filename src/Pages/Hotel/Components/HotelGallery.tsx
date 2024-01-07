import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Container,
  CircularProgress,
  CardMedia,
} from "@mui/material";
import Modal from "react-modal";
import { HotelGalleryResponse } from "../../../API/Hotel/types";
import { HotelGalleryRequest } from "../../../API/Hotel";
import { useLocation } from "react-router-dom";

const HotelGallery = () => {
  const location = useLocation();
  const hotel = location.state?.results || [];

  const [hotelGalleryData, setHotelGalleryData] = useState<
    HotelGalleryResponse[]
  >([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await HotelGalleryRequest(hotel.hotelId);
        setHotelGalleryData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [hotel.hotelId]);

  const openModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <Container
      sx={{
        backgroundColor: "white",
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
            <Grid
              item
              key={index}
              xs={12}
              lg={4}
              onClick={() => openModal(hotel.url)}
            >
              <CardMedia component="img" height="140" image={hotel.url} />
            </Grid>
          ))
        )}
      </Grid>
      <Modal
        isOpen={!!selectedImage}
        onRequestClose={closeModal}
        contentLabel="Image Modal"
      >
        <img
          src={selectedImage || ""}
          alt="Selected"
          style={{ width: "100%", height: "100%" }}
        />
      </Modal>
    </Container>
  );
};

export default HotelGallery;
