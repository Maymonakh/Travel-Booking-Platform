import { useEffect, useState } from "react";
import VisitedHotelsCard from "./VisitedHotelCard";
import { CircularProgress, Container, Grid, Typography } from "@mui/material";
import { VisitedHotelsResponse } from "../../../../API/Home/types";
import { visitedHotelsRequest } from "../../../../API/Home";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/grid";
import "../../../../Components/swiper-styles.css";

const VisitedHotels = () => {
  const [visitedHotels, setVisitedHotels] = useState<VisitedHotelsResponse[]>(
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await visitedHotelsRequest(token);
        setVisitedHotels(response.data);
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
      padding:4,
      borderRadius: 5,
      marginTop:1.5,
    }}
    >
      <Typography variant="h5" gutterBottom marginBottom={3}>
        Recent Visited Hotels:
      </Typography>
        {visitedHotels.length === 0 ? (
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <CircularProgress />
          </Grid>
        ) : (
          <Swiper
            navigation={true}
            modules={[Navigation]}
            loop={true}
            breakpoints={{
              300: { slidesPerView: 1, spaceBetween: 20 },
              490: { slidesPerView: 1.5, spaceBetween: 20 },
              800: { slidesPerView: 2, spaceBetween: 20 },
              1250: { slidesPerView: 3, spaceBetween: 20 },
            }}
         
          >
            {visitedHotels.map((hotel, index) => (
              <SwiperSlide key={index}>
                <VisitedHotelsCard data={hotel} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
    </Container>
  );
};

export default VisitedHotels;
