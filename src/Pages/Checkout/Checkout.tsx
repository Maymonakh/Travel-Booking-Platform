import React from "react";
import { Grid } from "@mui/material";
import NavBar from "../../Components/NavBar";
import { useLocation } from "react-router-dom";
import BookedRooms from "./Components/BookedRooms";

const Checkout: React.FC = () => {
  const locations = useLocation();
  const hotelId = locations.state?.results || [];
  console.log(hotelId);
  return (
    <div className="container">
      <NavBar />
      <Grid item xs={12}>
        <BookedRooms/>
      </Grid>
    </div>
  );
};

export default Checkout;
