import React from "react";
import { Grid } from "@mui/material";
import NavBar from "../../Components/NavBar";
import HotelGallery from "./Components/HotelGallery";
import HotelDetailes from "./Components/HotelDetails";
import Location from "./Components/Location";

const Hotel: React.FC = () => {
  return (
    <div className="container">
      <NavBar />
      <Grid container spacing={1.5}>
      <Grid item xs={12} md={4}>
          <HotelDetailes/>
        </Grid>
        <Grid item xs={12} md={8}>
          <HotelGallery />
        </Grid>
      </Grid>
    </div>
  );
};

export default Hotel;