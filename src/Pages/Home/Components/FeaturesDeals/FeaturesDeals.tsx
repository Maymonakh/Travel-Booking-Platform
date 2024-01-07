import { useState, useEffect } from "react";
import { featuresDealsRequest } from "../../../../API/Home";
import { FeaturesDealsResponse } from "../../../../API/Home/types";
import FeaturesDealsCard from "./FeaturesDealsCard";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/grid";
import { CircularProgress, Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import '../../../../Components/swiper-styles.css'

const FeaturesDeals = () => {
  const [featuresDealsData, setFeaturesDealsData] = useState<
    FeaturesDealsResponse[]
  >([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await featuresDealsRequest();
        setFeaturesDealsData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <Container
    sx={{
      backgroundColor: "white",
      padding:5,
      borderRadius: 5,
    }}
  >
    <Grid item xs={12} marginBottom={3}>
      <Typography variant="h5">Featured Deals:</Typography>
    </Grid>      
      {featuresDealsData.length === 0 ? (
              <CircularProgress />
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
          {featuresDealsData.map((hotel, index) => (
            <SwiperSlide key={index}>
              <FeaturesDealsCard data={hotel} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </Container>
  );
};

export default FeaturesDeals;
